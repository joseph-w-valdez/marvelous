require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const axios = require('axios');
const crypto = require('node:crypto');

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
    .catch(error => {
      console.error(error);
      next(error);
    });
});

app.post('/marvel/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(passwordHash => {
      const sql = `
        insert into "users" ("username", "passwordHash")
        values ($1, $2)
        returning "id", "username", "createdAt"
      `;
      const params = [username, passwordHash];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
