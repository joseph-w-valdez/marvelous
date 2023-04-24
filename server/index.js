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

app.use(staticMiddleware);
app.use(express.json());

app.get('/marvel/character/:characterName', async (req, res, next) => {
  try {
    const timestamp = Date.now().toString();
    const hash = crypto.createHash('md5').update(timestamp + process.env.API_PRIVATE_KEY + process.env.API_PUBLIC_KEY).digest('hex');
    const characterName = req.params.characterName;
    const exactMatch = req.query.exactMatch === 'true';

    // Change this line to include the 'name' parameter for exact match
    const searchParam = exactMatch ? `name=${encodeURIComponent(characterName)}` : `nameStartsWith=${encodeURIComponent(characterName)}`;
    const url = `https://gateway.marvel.com/v1/public/characters?apikey=${process.env.API_PUBLIC_KEY}&ts=${timestamp}&hash=${hash}&${searchParam}`;

    const { data: { data: { results } } } = await axios.get(url);
    if (results.length === 0) {
      throw new ClientError(404, `Could not find character with name '${characterName}'`);
    }
    const characterDataList = results.map(({ name, description = 'None Available', thumbnail, comics }) => {
      const characterThumbnailUrl = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : 'None Available';
      const characterComicAppearances = comics ? comics.available : 'None Available';
      return {
        name,
        description: description || 'None Available',
        imageUrl: characterThumbnailUrl,
        comicAppearances: characterComicAppearances
      };
    });
    res.status(200).json(characterDataList);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

function getUserByUsername(username) {
  const sql = `
    SELECT u."id", u."username", u."email", u."createdAt", f."characterId"
    FROM "users" AS u
    LEFT JOIN "favorites" AS f ON u."id" = f."userId"
    WHERE u."username" = $1
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
    SELECT u."id",
           u."passwordHash",
           u."profilePictureUrl",
           f."characterId"
      FROM "users" AS u
      LEFT JOIN "favorites" AS f ON u."id" = f."userId"
     WHERE u."username" = $1
  `;
  const params = [username];

  db.query(sql, params)
    .then(async (result) => {
      const { id, passwordHash, profilePictureUrl } = result.rows[0];
      const favoritesList = result.rows.filter((row) => row.characterId).map((row) => row.characterId);

      return argon2.verify(passwordHash, password)
        .then((isMatching) => {
          // If password is invalid, throw an error
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          // If password is valid, create a JWT token and send it as a response; token expires in 24h for security
          const token = jwt.sign({ userId: id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
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
    SELECT u."id",
           u."passwordHash",
           u."profilePictureUrl",
           f."characterId"
      FROM "users" AS u
      LEFT JOIN "favorites" AS f ON u."id" = f."userId"
     WHERE u."username" = $1
  `;
  const params = [username];

  try {
    const result = await db.query(sql, params);
    const [user] = result.rows;

    if (!user) {
      throw new ClientError(401, 'invalid login');
    }

    const { id, passwordHash, profilePictureUrl } = user;
    const favoritesList = result.rows.filter((row) => row.characterId).map((row) => row.characterId);

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
  `, [selectedCharacter.name, selectedCharacter.description, selectedCharacter.imageUrl, selectedCharacter.comicAppearances]);
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

app.post('/marvel/toggleFavorites', async (req, res, next) => {
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
      // Save the updated favorites list to the server immediately
      await saveFavoritesToServer(userId);
      res.status(200).json({ message: 'Successfully removed from favorites.', id: characterId });
    } else {
      await addFavorite(userId, characterId);
      // Save the updated favorites list to the server immediately
      await saveFavoritesToServer(userId);
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

async function saveFavoritesToServer(userId) {
  try {
    const favoritesList = await getFavoriteCharacterIds(userId);
    const token = localStorage.getItem('token');
    await axios.post('/marvel/savefavorites', { favoritesList }, { headers: { Authorization: `Bearer ${token}` } });
  } catch (err) {
    console.error(err);
  }
}

app.post('/marvel/savefavorites', authorizationMiddleware, async (req, res, next) => {
  try {
    const { favoritesList } = req.body;
    if (!favoritesList || !Array.isArray(favoritesList)) {
      throw new ClientError(400, 'favoritesList must be an array');
    }
    const userId = req.user.id;
    // Delete the old favorites for this user
    await db.query(`
      DELETE FROM favorites
      WHERE "userId" = $1
    `, [userId]);
    // Insert the new favorites for this user
    for (const characterId of favoritesList) {
      await addFavorite(userId, characterId);
    }
    res.status(200).json({ message: 'Successfully saved favorites to server' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


app.post('/marvel/getfavorites', authorizationMiddleware, async (req, res, next) => {
  try {
    const { favorites } = req.body;
    if (!favorites || !Array.isArray(favorites)) {
      throw new ClientError(400, 'favorites must be an array');
    }
    if (favorites.length === 0) {
      // If the favorites array is empty, return an empty response
      res.status(200).json([]);
      return;
    }
    // query the characters table for all characters with matching id values from the req
    const { rows } = await db.query(
      'SELECT * FROM characters WHERE id = ANY($1::int[])',
      [favorites]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.post('/marvel/updateFavorites', authorizationMiddleware, async (req, res, next) => {
  try {
    const { favorites } = req.body;
    if (!favorites || !Array.isArray(favorites)) {
      throw new ClientError(400, 'favorites must be an array');
    }

    const userId = req.userId;
    // Delete all existing favorites for the user
    await db.query(`
      DELETE FROM favorites
      WHERE "userId" = $1
    `, [userId]);

    // Insert new favorites for the user
    const promises = favorites.map((characterId) => addFavorite(userId, characterId));
    await Promise.all(promises);

    res.status(200).json({ message: 'Favorites updated successfully' });
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
