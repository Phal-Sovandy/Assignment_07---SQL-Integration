//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//
import { pool } from "../utils/database.js";

// Get all articles
export async function getArticles() {
  // TODO
  try {
    const [rows] = await pool.query("SELECT * FROM articles;");
    return rows;
  } catch (err) {
    console.error("Error fetching articles:", err);
    throw err;
  }
}

// Get one article by ID
export async function getArticleById(id) {
  // TODO
  try {
    const [rows] = await pool.query(`SELECT * FROM articles WHERE id = ?;`, [
      Number(id),
    ]);
    return rows[0];
  } catch (err) {
    console.error("Error fetching articles:", err);
    throw err;
  }
}

// Create a new article
export async function createArticle(article) {
  // TODO
  try {
    const [rows] = await pool.query(
      `INSERT INTO articles(title, content, journalist, category) VALUES(?, ?, ?, ?);`,
      Object.values(article)
    );
    return rows[0];
  } catch (err) {
    console.error("Error creating articles:", err);
    throw err;
  }
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
  // TODO
  try {
    const [rows] = await pool.query(
      `UPDATE articles SET title = ?, content = ?, journalist = ?, category = ? WHERE id = ?;`,
      [
        updatedData.title,
        updatedData.content,
        updatedData.journalist,
        updatedData.category,
        id,
      ]
    );
    return rows.affectedRows;
  } catch (err) {
    console.error("Error updating articles:", err);
    throw err;
  }
}

// Delete an article by ID
export async function deleteArticle(id) {
  // TODO
  try {
    const [rows] = await pool.query(`DELETE FROM articles WHERE id = ?;`, [id]);
    return rows;
  } catch (err) {
    console.error("Error deleting articles:", err);
    throw err;
  }
}
