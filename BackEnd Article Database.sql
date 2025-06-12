CREATE DATABASE week6Db;
USE week6Db;

CREATE TABLE articles(
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    content text,
    journalist VARCHAR(100),
    category VARCHAR(50)
);

SELECT * FROM articles;

SELECT * FROM articles WHERE journalist = 'RONAN';

INSERT INTO articles(title, content, journalist, category)
VALUES ('All of Us are dead', 'There a group of student run away from school of zombies', 'Phal Sovandy', 'Horrors');

DELETE FROM articles 
WHERE title LIKE 'R%';
