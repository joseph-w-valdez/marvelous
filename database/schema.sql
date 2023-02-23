set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  emailHash CHAR(64) NOT NULL,
  passwordHash CHAR(60) NOT NULL,
  profilePictureUrl VARCHAR(255)
);

CREATE TABLE characters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  imageUrl VARCHAR(255) NOT NULL,
  comicAppearances INT NOT NULL
);

CREATE TABLE favorites (
  userId INT NOT NULL,
  characterId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (characterId) REFERENCES characters(id) ON DELETE CASCADE,
  PRIMARY KEY (userId, characterId)
);
