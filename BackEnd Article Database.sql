DROP DATABASE week6Db;
CREATE DATABASE week6Db;
USE week6Db;

CREATE TABLE journalist(
    journalistId INT PRIMARY KEY AUTO_INCREMENT,
    jur_name VARCHAR(255) UNIQUE,
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
select * from articles;

CREATE TABLE category(
	categoryId INT PRIMARY KEY AUTO_INCREMENT,
    cat_name VARCHAR(20) UNIQUE
);

CREATE TABLE category_article(
	articleId INT,
    categoryId INT,
    FOREIGN KEY (articleId) REFERENCES articles(id),
    FOREIGN KEY (categoryId) REFERENCES category(categoryId)
);


-- Insert journalists
INSERT INTO journalist (jur_name, email, bio) VALUES
('Sophia Tan', 'sophia.tan@example.com', 'Award-winning journalist with 10 years of experience covering Southeast Asian politics and culture.'),
('Liam Chen', 'liam.chen@example.com', 'Tech writer and analyst, focused on startups, innovation, and AI advancements.'),
('Isabella Sok', 'isabella.sok@example.com', 'Freelance health and science journalist with a passion for public education.'),
('David Heng', 'david.heng@example.com', 'Senior investigative reporter covering government and policy.'),
('Nita Vong', 'nita.vong@example.com', 'Lifestyle columnist writing about travel, wellness, and modern living.');

-- Insert categories
INSERT INTO category (cat_name) VALUES 
('Technology'),
('Health'),
('Education'),
('Entertainment'),
('Business'),
('Science'),
('Travel'),
('Lifestyle'),
('Sports'),
('Politics'),
('Environment'),
('Culture');

-- Insert articles
INSERT INTO articles (title, content, journalistId) VALUES
('The Rise of Clean Energy in Cambodia',
 'Cambodia is rapidly adopting solar and wind energy, supported by government incentives and foreign investment. Projects in provinces like Kampong Speu and Battambang have seen significant growth...',
 3),
('Breakthrough in Local AI Research',
 'Researchers from Phnom Penh Institute of Technology have unveiled a new AI model optimized for Khmer language understanding...',
 2),
('Healthcare Challenges in Rural Provinces',
 'Access to quality healthcare remains a challenge in Cambodia\'s rural areas. Many communities are underserved...',
 3),
('General Elections: What to Expect in 2025',
 'As the general elections approach, political campaigns are intensifying. Key parties are focusing on economic recovery...',
 4),
('Digital Nomads Flocking to Siem Reap',
 'With improved internet infrastructure and affordable living, Siem Reap is becoming a hotspot for digital nomads...',
 5),
('How Startups Are Changing the Education Sector',
 'EdTech startups in Cambodia are making learning more accessible...',
 2),
('Inside the Mekong River Conservation Efforts',
 'Conservation groups are working to protect the Mekong River ecosystem...',
 3),
('Government Unveils Economic Recovery Plan',
 'In response to the post-pandemic slowdown, the Cambodian government has launched a multi-phase economic recovery plan...',
 4),
('The Future of Journalism in the Age of AI',
 'AI tools are increasingly used in journalism for content generation, data analysis, and audience engagement...',
 2),
('Traditional Crafts See Revival Through E-Commerce',
 'Khmer silk weaving, pottery, and wood carving are experiencing a revival thanks to online platforms...',
 5);

-- Insert category_article 
INSERT INTO category_article (articleId, categoryId) VALUES
(1, 6), (1, 11),          
(2, 1), (2, 3), (2, 5),  
(3, 2), (3, 3),        
(4, 10), (4, 5),        
(5, 1), (5, 7), (5, 8), 
(6, 1), (6, 3),           
(7, 11), (7, 6),          
(8, 5), (8, 1),           
(9, 1), (9, 4),          
(10, 12), (10, 5);   


SELECT DISTINCT
  a.id,
  a.title,
  a.content,
  j.jur_name,
  (
    SELECT GROUP_CONCAT(c.cat_name SEPARATOR ', ')
    FROM category_article ca
    JOIN category c ON ca.categoryId = c.categoryId
    WHERE ca.articleId = a.id
  ) AS categories
FROM articles AS a
INNER JOIN journalist AS j ON a.journalistId = j.journalistId
INNER JOIN category_article ca2 ON a.id = ca2.articleId
WHERE ca2.categoryId IN (8, 1);
