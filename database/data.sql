INSERT INTO users (username, email, "passwordHash", "profilePictureUrl") VALUES
  ('user1', 'hash_of_user1@example.com', '$2y$10$Y53YJF.TgZm9kckHnpq3z.18uzJfhqb7OM/YtByY/UXTQzRtjL5x2', 'https://example.com/user1.jpg'),
  ('user2', 'hash_of_user2@example.com', '$2y$10$c4Q/W50tFhDlOwscyj81AOCc5lz5O5hvlEs5OeiSEld9GnJ1f7VWK', NULL),
  ('didyouknow', 'asd@asd.com', '$argon2id$v=19$m=4096,t=3,p=1$2//7a2ZcOrOA1UsBaVQo6w$EPjliLEiO5ih8PgYjnlSvRIT/5+vqYYpoKDgVKTQKjI', '/images/image-1677882956940.png');


INSERT INTO characters (name, description, "imageUrl", "comicAppearances") VALUES
  ('Spider-Man', 'Friendly neighborhood superhero', 'https://example.com/spider-man.jpg', 4000),
  ('Batman', 'Dark Knight of Gotham City', 'https://example.com/batman.jpg', 2500),
  ('Superman', 'Man of Steel', 'https://example.com/superman.jpg', 2000);

INSERT INTO favorites ("userId", "characterId") VALUES
  (1, 1), (1, 2), (2, 3);
