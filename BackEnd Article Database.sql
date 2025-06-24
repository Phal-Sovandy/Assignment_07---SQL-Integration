-- EX-01-02
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


-- EX-03

-- Option 1: Alter table instead of create a new one
-- ALTER TABLE articles
-- ADD COLUMN journalistId INT;

-- UPDATE articles a
-- JOIN journalist j ON a.journalist = j.name
-- SET a.journalistId = j.journalistId;

-- ALTER TABLE articles
-- DROP COLUMN journalist;

-- ALTER TABLE articles
-- ADD CONSTRAINT fk_journalist
-- FOREIGN KEY (journalistId) REFERENCES journalist(journalistId);

-- Option 2: Drop table and create a new one
DROP TABLE articles;
CREATE TABLE journalist(
    journalistId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    bio TEXT
);

CREATE TABLE articles(
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    content TEXT,
    journalistId INT,
    category VARCHAR(50),
    FOREIGN KEY (journalistId) REFERENCES journalist(journalistId)
);


-- Insert data into journalist table
INSERT INTO journalist (name, email, bio) VALUES
('Alice Johnson', 'alice.johnson@example.com', 'Alice is a senior political journalist with over 10 years of experience.'),
('Bob Smith', 'bob.smith@example.com', 'Bob covers technology and startups across Southeast Asia.'),
('Clara Nguyen', 'clara.nguyen@example.com', 'Clara is a freelance journalist focusing on environmental issues.');

-- Insert data into articles table
INSERT INTO articles (title, content, journalistId, category) VALUES
('Government Announces New Tax Reforms', 'The government has introduced new tax reforms aimed at boosting the economy...', 1, 'Politics'),
('Startups Thrive in 2025 Tech Boom', 'Startups in Asia are thriving with record investments in the first quarter...', 2, 'Technology'),
('Climate Change Effects in Coastal Regions', 'Coastal communities are experiencing more frequent flooding and storms...', 3, 'Environment'),
('Election Results: What’s Next?', 'The recent election results have reshaped the political landscape...', 1, 'Politics'),
('AI Tools Changing Journalism', 'Artificial Intelligence is revolutionizing how journalists research and report...', 2, 'Technology')
('Inside the Minds of Innovators: A Deep Dive',
 'In today’s rapidly evolving digital landscape, innovation is no longer optional — it’s a necessity. 
  We spoke to over 30 leading minds across industries to uncover what fuels their creative processes.
  From early brainstorming to product launch, this article explores every step of the journey.
  
  The story begins in the heart of Silicon Valley, where startup culture has embraced a fail-fast mindset.
  According to Dr. Aileen Grant, "Innovation thrives in environments where calculated risks are rewarded."
  
  Case studies include companies like Neuromind, which pivoted three times before landing their breakthrough brain-to-text software.
  Another highlight is a deep look at how decentralization and blockchain tech are fostering innovation in traditionally rigid industries like banking.
  
  Beyond the boardroom, we examine how educational institutions are preparing the next generation of thinkers and tinkerers.
  The article wraps up with a call to action for organizations to build internal cultures that reward experimentation and curiosity.
  
  This is not just a tech revolution — it’s a human one.',
 2, 'Innovation');
