CREATE DATABASE vinnys_dojo_blog;
USE vinnys_dojo_blog;

CREATE TABLE blogs (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO blogs (title, author, content)
VALUES
('My First Blog', 'Vince', 'Testing my first blog post'),
('My Second Blog', 'Vince', 'Testing my second blog post');