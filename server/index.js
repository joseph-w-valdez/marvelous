require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const axios = require('axios');
const crypto = require('crypto');

const app = express();

const API_PUBLIC_KEY = 'b8483fd7fba99cd20a9fefc4e5106f88';
const API_PRIVATE_KEY = 'c2746ff73c66112e104538fe16622cbb21205d8f';
const timestamp = Date.now().toString();
const hash = crypto.createHash('md5').update(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY).digest('hex');
const characterName = 'Kang';

const url = `https://gateway.marvel.com/v1/public/characters?apikey=${API_PUBLIC_KEY}&ts=${timestamp}&hash=${hash}&name=${encodeURIComponent(characterName)}`;

axios.get(url)
  .then(response => {
    const data = response.data.data;
    const character = data.results[0]; // Assuming the search only returned one result
    const characterName = character.name;
    const characterDescription = character.description;
    const characterThumbnailUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`;

    console.log(`Name: ${characterName}`);
    console.log(`Description: ${characterDescription}`);
    console.log(`Thumbnail URL: ${characterThumbnailUrl}`);
  })
  .catch(error => {
    console.error(error);
  });

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
