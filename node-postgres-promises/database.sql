DROP DATABASE IF EXISTS text_editor_db;
CREATE DATABASE text_editor_db;

\c text_editor_db;

CREATE TABLE text (
  id SERIAL4 PRIMARY KEY,
  the_text VARCHAR
);

INSERT INTO text (the_text)
  VALUES ('<h1>Text loaded from database</h1>');
