require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const axios = require('axios');
const crypto = require('node:crypto');
const path = require('path');
const uploadsMiddleware = require('./uploads-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const API_PUBLIC_KEY = 'b8483fd7fba99cd20a9fefc4e5106f88';
const API_PRIVATE_KEY = 'c2746ff73c66112e104538fe16622cbb21205d8f';

app.use(staticMiddleware);
app.use(express.json());

app.get('/marvel/character/:characterName', async (req, res, next) => {
  try {
    // Get the timestamp and hash for the API request
    const timestamp = Date.now().toString();
    const hash = crypto.createHash('md5').update(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY).digest('hex');
    // Get the character name from the request parameters
    const characterName = req.params.characterName;
    // Construct the URL for the API request
    const url = `https://gateway.marvel.com/v1/public/characters?apikey=${API_PUBLIC_KEY}&ts=${timestamp}&hash=${hash}&name=${encodeURIComponent(characterName)}`;
    // Send the API request and get the results
    const { data: { data: { results } } } = await axios.get(url);
    // If no results are found, throw a 404 error
    if (results.length === 0) {
      throw new ClientError(404, `Could not find character with name '${characterName}'`);
    }
    // Extract the relevant properties from the first result
    const { name, description = 'None Available', thumbnail, comics } = results[0];
    // Construct the thumbnail URL and comic appearances string
    const characterThumbnailUrl = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : 'None Available';
    const characterComicAppearances = comics ? comics.available : 'None Available';
    // Construct the character data object
    const characterData = {
      name,
      description: description || 'None Available',
      thumbnailUrl: characterThumbnailUrl,
      comicAppearances: characterComicAppearances
    };
    // Send the character data as a JSON response
    res.status(200).json(characterData);
  } catch (error) {
    // Log the error and pass it to the error handling middleware
    console.error(error);
    next(error);
  }
});

function getUserByUsername(username) {
  const sql = `
    select "id", "username", "email", "createdAt" from "users" where "username" = $1 limit 1
  `;
  const params = [username];
  return db.query(sql, params);
}

function getUserByEmail(email) {
  const sql = `
    select "id", "username", "email", "createdAt" from "users" where "email" = $1 limit 1
  `;
  const params = [email];
  return db.query(sql, params);
}

function createUser(username, passwordHash, email, profilePictureUrl) {
  const sql = `
    insert into "users" ("username", "passwordHash", "email", "profilePictureUrl")
    values ($1, $2, $3, $4)
    on conflict do nothing
    returning "id", "username", "email", "createdAt", "profilePictureUrl"
  `;
  const params = [username, passwordHash, email, profilePictureUrl];
  return db.query(sql, params);
}

app.post('/marvel/registration', async (req, res, next) => {
  const { username, password, email, profilePictureUrl } = req.body;

  if (!username || !password || !email) {
    throw new ClientError(400, 'username, password, and email are all required fields');
  }

  try {
    // Hash the password and query the database for existing usernames and emails in parallel
    const passwordHash = await argon2.hash(password);
    const [usernameResult, emailResult] = await Promise.all([
      getUserByUsername(username),
      getUserByEmail(email)
    ]);

    // Check if username or email already exists in the database
    if (usernameResult.rows.length > 0) {
      throw new ClientError(409, 'username already exists');
    }
    if (emailResult.rows.length > 0) {
      throw new ClientError(409, 'email already exists');
    }
    // Insert the new user into the database
    const result = await createUser(username, passwordHash, email, profilePictureUrl);

    if (result.rowCount === 0) {
      // If no rows were affected, the insert failed due to a conflict with existing data
      throw new ClientError(409, 'username or email already exists');
    } else {
      const [user] = result.rows;
      // Return the newly created user as a response
      res.status(201).json(user);
    }
  } catch (err) {
    next(err);
  }
});

app.post('/marvel/upload', uploadsMiddleware, (req, res, next) => {
  res.status(200).send(req.file.filename);
});

async function getFavoriteCharacterIds(userId) {
  const sql = `
    SELECT "characterId"
    FROM "favorites"
    WHERE "userId" = $1
  `;
  const params = [userId];
  const result = await db.query(sql, params);
  return result.rows.map((row) => row.characterId);
}

app.post('/marvel/sign-in', (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }

  const sql = `
    SELECT "id",
           "passwordHash",
           "profilePictureUrl"
      FROM "users"
     WHERE "username" = $1
  `;
  const params = [username];

  db.query(sql, params)
    .then(async (result) => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }

      const { id, passwordHash, profilePictureUrl } = user;
      const favoritesList = await getFavoriteCharacterIds(user.id);

      return argon2.verify(passwordHash, password)
        .then((isMatching) => {
          // If password is invalid, throw an error
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          // If password is valid, create a JWT token and send it as a response
          const token = jwt.sign({ userId: id }, process.env.TOKEN_SECRET);
          res.status(200).json({ token, profilePictureUrl, favoritesList });
        });
    })
    .catch((err) => {
      console.error('argon2.verify error', err);
      next(err);
    });
});

app.post('/marvel/demo', async (req, res, next) => {
  // Hardcoded username and password for demo purposes
  const username = 'didyouknow';
  const password = 'Vaporeon!1';

  const sql = `
    SELECT "id",
           "passwordHash",
           "profilePictureUrl",
           "username"
      FROM "users"
     WHERE "username" = $1
  `;
  const params = [username];

  try {
    const result = await db.query(sql, params);
    const [user] = result.rows;

    if (!user) {
      throw new ClientError(401, 'invalid login');
    }

    const { id, passwordHash, profilePictureUrl } = user;
    const favoritesList = await getFavoriteCharacterIds(user.id);

    const isMatching = await argon2.verify(passwordHash, password);
    if (!isMatching) {
      throw new ClientError(401, 'invalid login');
    }

    const token = jwt.sign({ userId: id }, process.env.TOKEN_SECRET);
    res.status(200).json({ token, profilePictureUrl, username, favoritesList });
  } catch (err) {
    console.error('argon2.verify error', err);
    next(err);
  }
});

// function to add a new character to the database
async function addNewCharacter(selectedCharacter) {
  const result = await db.query(`
    INSERT INTO "characters" ("name", "description", "imageUrl", "comicAppearances")
    VALUES ($1, $2, $3, $4)
    RETURNING "id"
  `, [selectedCharacter.name, selectedCharacter.description, selectedCharacter.thumbnailUrl, selectedCharacter.comicAppearances]);
  const [newCharacter] = result.rows;
  return newCharacter;
}

// function to retrieve a character's id from the database
async function getCharacterId(selectedCharacter) {
  const result = await db.query(`
    SELECT id FROM characters WHERE name = $1
  `, [selectedCharacter.name]);
  if (result.rows.length > 0) {
    const [existingCharacter] = result.rows;
    return existingCharacter.id;
  }
  return null;
}

// function to retrieve a user's id from the database
async function getUserId(username) {
  const result = await db.query(`
    SELECT id FROM users WHERE username = $1
  `, [username]);
  const [currentUser] = result.rows;
  return currentUser.id;
}

// function to add a favorite to the database
async function addFavorite(userId, characterId) {
  const favoriteData = [userId, characterId];
  await db.query(`
    INSERT INTO favorites ("userId", "characterId")
    VALUES ($1, $2)
    ON CONFLICT ("userId", "characterId")
    DO UPDATE SET "userId" = EXCLUDED."userId", "characterId" = EXCLUDED."characterId";
  `, favoriteData);
}

app.post('/marvel/favorites', async (req, res, next) => {
  try {
    const { selectedCharacter, user, action } = req.body;
    if (!selectedCharacter) {
      throw new ClientError(400, 'selectedCharacter is a required field');
    }

    let characterId = await getCharacterId(selectedCharacter);
    if (!characterId) {
      const newCharacter = await addNewCharacter(selectedCharacter);
      characterId = newCharacter.id;
    }

    const userId = await getUserId(user.username);
    if (action === 'unfavorite') {
      await db.query(`
        DELETE FROM favorites
        WHERE "userId" = $1 AND "characterId" = $2
      `, [userId, characterId]);
      res.status(200).json({ message: 'Successfully removed from favorites.', id: characterId });
    } else {
      await addFavorite(userId, characterId);
      if (characterId) {
        res.status(201).json({ message: 'Successfully added to favorites', id: characterId });
      } else {
        throw new Error('Unable to retrieve character ID');
      }
    }
  } catch (err) {
    next(err);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(authorizationMiddleware);

app.post('/marvel/sign-out', (req, res, next) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'You have been signed out'
  });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
