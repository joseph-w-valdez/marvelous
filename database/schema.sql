set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  "username" TEXT UNIQUE NOT NULL,
  "email" TEXT unique NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "profilePictureUrl" TEXT,
  "createdAt" timestamptz(6) not null default now()
);

CREATE TABLE characters (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "comicAppearances" INT NOT NULL
);


CREATE TABLE favorites (
  "userId" INT NOT NULL,
  "characterId" INT NOT NULL,
  FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY ("characterId") REFERENCES characters(id) ON DELETE CASCADE,
  PRIMARY KEY ("userId", "characterId")
);
