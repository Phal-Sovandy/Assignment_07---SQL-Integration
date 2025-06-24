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
    const [rows] = await pool.query(
      "SELECT id, title, content, category, jur_name, j.journalistId FROM articles AS a INNER JOIN journalist AS j ON a.journalistId = j.journalistId;"
    );
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
    const [rows] = await pool.query(
      `SELECT 
  a.id,
  a.title,
  a.content,
  a.category,
  j.jur_name,
  j.journalistId,
  (
  SELECT GROUP_CONCAT(c.categoryId)
  FROM category_article ca
  JOIN category c ON ca.categoryId = c.categoryId
  WHERE ca.articleId = a.id
) AS categoryIds
FROM articles AS a
INNER JOIN journalist AS j ON a.journalistId = j.journalistId
WHERE a.id = ?;
`,
      [Number(id)]
    );
    return rows[0];
  } catch (err) {
    console.error("Error fetching articles:", err);
    throw err;
  }
}

// Get all articles by Journalist ID
export async function getArticleByJournalistId(id) {
  // TODO
  try {
    const [rows] = await pool.query(
      `SELECT 
  a.id,
  a.title,
  a.content,
  j.jur_name,
  a.journalistId,
  (
    SELECT GROUP_CONCAT(c.cat_name SEPARATOR ', ')
    FROM category_article ca
    JOIN category c ON ca.categoryId = c.categoryId
    WHERE ca.articleId = a.id
  ) AS categories
FROM articles AS a
INNER JOIN journalist AS j ON a.journalistId = j.journalistId
WHERE j.journalistId = ?;
`,
      [Number(id)]
    );
    return rows;
  } catch (err) {
    console.error("Error fetching articles:", err);
    throw err;
  }
}

// Create a new article
export async function createArticle(article) {
  // TODO
  try {
    let [journalistRows] = await pool.query(
      "SELECT journalistId FROM journalist WHERE jur_name = ?",
      [article.journalist]
    );

    if (journalistRows.length === 0) {
      const [newJournalist] = await pool.query(
        `INSERT INTO journalist(jur_name, email, bio) VALUES(?, ?, ?)`,
        [article.journalist, "not set", "not set"]
      );

      [journalistRows] = await pool.query(
        "SELECT journalistId FROM journalist WHERE jur_name = ?",
        [article.journalist]
      );
    }

    const journalistId = journalistRows[0].journalistId;

    const [rows] = await pool.query(
      `INSERT INTO articles(title, content, journalistId, category) VALUES(?, ?, ?, ?);`,
      [article.title, article.content, journalistId, article.category]
    );
    return { insertId: rows.insertId };
  } catch (err) {
    console.error("Error creating articles:", err);
    throw err;
  }
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
  // TODO
  try {
    const journalistId = Number(updatedData.journalist);

    await pool.query(
      `UPDATE articles SET title = ?, content = ?, journalistId = ? WHERE id = ?;`,
      [updatedData.title, updatedData.content, journalistId, id]
    );
    updatedData.category = updatedData.category
      .split(",")
      .map((id) => Number(id.trim()))
      .filter((id, index, self) => !isNaN(id) && self.indexOf(id) === index); // Eliminate both non-number and duplicate

    if (
      Array.isArray(updatedData.category) &&
      updatedData.category.length > 0
    ) {
      const values = updatedData.category.map((catId) => [id, catId]);
      //delete old category
      await pool.query("DELETE FROM category_article WHERE articleId = ?", [
        id,
      ]);

      // Add new category
      await pool.query(
        "INSERT INTO category_article (articleId, categoryId) VALUES ?",
        [values]
      );
    }
  } catch (err) {
    console.error("Error updating articles:", err);
    throw err;
  }
}

// Delete an article by ID
export async function deleteArticle(id) {
  try {
    const [result] = await pool.query(`DELETE FROM articles WHERE id = ?`, [
      id,
    ]);

    if (result.affectedRows === 0) {
      throw new Error(`No article found with ID ${id}`);
    }

    return { deletedId: id };
  } catch (err) {
    console.error("Error deleting article:", err);
    throw err;
  }
}

// Get all category
export async function getCategories() {
  try {
    const [categories] = await pool.query("SELECT * FROM category");
    if (categories.length === 0 || !categories) {
      throw new Error(`No category found.`);
    }
    return categories;
  } catch (err) {
    console.error("Error fetching category:", err);
    throw err;
  }
}
// Get article by category
export async function getArticlesCategory(categoryIds) {
  try {
    let query = `
      SELECT DISTINCT
  a.id,
  a.title,
  a.content,
  j.jur_name,
  j.journalistId,
  (
    SELECT GROUP_CONCAT(c.cat_name SEPARATOR ', ')
    FROM category_article ca
    JOIN category c ON ca.categoryId = c.categoryId
    WHERE ca.articleId = a.id
  ) AS categories
FROM articles AS a
INNER JOIN journalist AS j ON a.journalistId = j.journalistId
INNER JOIN category_article ca2 ON a.id = ca2.articleId
    `;

    if (categoryIds.length > 0) {
      const placeholders = categoryIds.map(() => "?").join(",");
      query += ` WHERE ca2.categoryId IN (${placeholders});`;
    }
    const [articles] = await pool.query(query, categoryIds);
    return articles;
  } catch (err) {
    console.error("Error fetching articles by categories:", err);
    throw err;
  }
}
