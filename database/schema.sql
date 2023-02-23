set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email_hash CHAR(64) NOT NULL,
  password_hash CHAR(60) NOT NULL,
  profile_picture_url VARCHAR(255)
);

CREATE TABLE characters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  comic_appearances INT NOT NULL
);

CREATE TABLE favorites (
  user_id INT NOT NULL,
  character_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, character_id)
);
