require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const axios = require('axios');
const crypto = require('node:crypto');
const path = require('path');

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

app.get('/marvel/:characterName', (req, res, next) => {

  const timestamp = Date.now().toString();
  const hash = crypto.createHash('md5').update(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY).digest('hex');
  const characterName = req.params.characterName;
  const url = `https://gateway.marvel.com/v1/public/characters?apikey=${API_PUBLIC_KEY}&ts=${timestamp}&hash=${hash}&name=${encodeURIComponent(characterName)}`;

  axios.get(url)
    .then(({ data: { data: { results } } }) => {
      if (results.length === 0) {
        throw new ClientError(404, `Could not find character with name '${characterName}'`);
      }
      const { name, description = 'None Available', thumbnail, comics } = results[0] || {};
      const characterThumbnailUrl = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : 'None Available';
      const characterComicAppearances = comics ? comics.available : 'None Available';

      const characterData = {
        name,
        description: description || 'None Available',
        thumbnailUrl: characterThumbnailUrl,
        comicAppearances: characterComicAppearances
      };

      res.status(200).json(characterData);
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

app.post('/marvel/registration', (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    throw new ClientError(400, 'username, password, and email are all required fields');
  }
  argon2
    .hash(password)
    .then((passwordHash) => {
      const usernameSql = `
        select "id", "username", "email", "createdAt" from "users" where "username" = $1 limit 1
      `;
      const usernameParams = [username];

      const emailSql = `
        select "id", "username", "email", "createdAt" from "users" where "email" = $1 limit 1
      `;
      const emailParams = [email];

      return Promise.all([
        db.query(usernameSql, usernameParams),
        db.query(emailSql, emailParams),
        argon2.hash(password)
      ]);
    })
    .then(([usernameResult, emailResult, passwordHash]) => {
      if (usernameResult.rows.length > 0) {
        throw new ClientError(409, 'username already exists');
      }
      if (emailResult.rows.length > 0) {
        throw new ClientError(409, 'email already exists');
      }
      const sql = `
        insert into "users" ("username", "passwordHash", "email")
        values ($1, $2, $3)
        on conflict do nothing
        returning "id", "username", "email", "createdAt"
      `;
      const params = [username, passwordHash, email];
      return db.query(sql, params);
    })
    .then((result) => {
      if (result.rowCount === 0) {
        throw new ClientError(409, 'username or email already exists');
      } else {
        const [user] = result.rows;
        res.status(201).json(user);
      }
    })
    .catch((err) => next(err));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
