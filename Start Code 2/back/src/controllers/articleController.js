import * as articleRepository from "../repositories/sqlArticleRepository.js";

// TODO : Change articleRepository to use the sqlArticleRepository

// GET /api/articles
export async function getAllArticles(req, res) {
  try {
    const articles = await articleRepository.getArticles();
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/articles/:id
export async function getArticleById(req, res) {
  try {
    const article = await articleRepository.getArticleById(req.params.id);
    if (!article) {
      return res.status(200).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/journalists/:id/articles
export async function getArticleByJournalistId(req, res) {
  try {
    const article = await articleRepository.getArticleByJournalistId(
      req.params.id
    );
    if (!article) {
      return res.status(200).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// POST /api/articles
export async function createArticle(req, res) {
  try {
    const newArticle = await articleRepository.createArticle(req.body);
    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// PUT /api/articles/:id
export async function updateArticle(req, res) {
  try {
    const updatedArticle = await articleRepository.updateArticle(
      req.params.id,
      req.body
    );
    if (!updatedArticle) {
      return res.status(200).json({ message: "Article not found" });
    }
    res.json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// DELETE /api/articles/:id
export async function deleteArticle(req, res) {
  try {
    await articleRepository.deleteArticle(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/categories
export async function getCategories(req, res) {
  try {
    const categories = await articleRepository.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /api/categories/articles?categoryId=1,3,5
export async function getArticlesByCategory(req, res) {
  const categoryIdsParam = req.query.categoryId;

  const categoryIds = categoryIdsParam
    ? categoryIdsParam.split(",").map((id) => Number(id))
    : [];

  try {
    const articles = await articleRepository.getArticlesCategory(categoryIds);

    if (!articles.length) {
      return res
        .status(200)
        .json({ message: "No articles found for these categories" });
    }
    res.status(200).json(articles);
  } catch (error) {
    console.error(
      `Error fetching articles for categories ${categoryIdsParam}:`,
      error
    );
    res.status(500).json({ message: "Server error" });
  }
}
