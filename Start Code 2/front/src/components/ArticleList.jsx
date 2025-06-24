import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getArticles,
  getCategories,
  getArticleByCategory,
  removeArticle,
} from "../services/api";

//
// ArticleList component
//
export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // fetchArticles(); // Fetch all articles when component mounts
    fetchCategories();
    fetchArticleByCategory();
    console.log(articles);
  }, [filter]);

  const fetchArticleByCategory = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticleByCategory(filter);
      setArticles(data);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticles(filter);
      setArticles(data);
      console.log(articles);
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      await removeArticle(id);
      await fetchArticles(); // refresh the list
    } catch (err) {
      setError("Failed to delete article.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (id) => navigate(`/articles/${id}`);
  const handleEdit = (id) => navigate(`/articles/${id}/edit`);

  const handleFilter = (e) => {
    const id = parseInt(e.target.value);

    const checked = e.target.checked;

    setFilter((prev) =>
      checked ? [...prev, id] : prev.filter((catId) => catId !== id)
    );
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        style={{
          display: "flex",
          backgroundColor: "#cdf1ff",
          padding: "20px",
          gap: "30px",
        }}
      >
        <h3
          style={{
            width: "20%",
            minWidth: "75px",
            maxWidth: "300px",
            fontSize: "1rem",
            color: "black",
          }}
        >
          Filter Article By Category
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {categories.map((category) => (
            <div
              key={category.categoryId}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                backgroundColor: "lightblue",
                padding: "10px",
                borderRadius: "5px",
                outline: "1px solid black",
              }}
            >
              <label htmlFor={`category-${category.categoryId}`}>
                {category.cat_name}
              </label>
              <input
                type="checkbox"
                id={`category-${category.categoryId}`}
                name="categories"
                value={category.categoryId}
                onChange={handleFilter}
                style={{
                  accentColor: "black",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="article-list">
        {Array.isArray(articles) ? (
          articles.map((article) => {
            return (
              <ArticleCard
                key={`card-${article.id}`}
                article={article}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={deleteArticle}
              />
            );
          })
        ) : (
          <p
            style={{
              color: "gray",
              fontStyle: "italic",
            }}
          >
            {articles.message || "No articles to display."}
          </p>
        )}
      </div>
    </>
  );
}

function ArticleCard({ article, onView, onEdit, onDelete }) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      <div className="article-author">
        By{" "}
        <Link to={`/journalists/${article.journalistId}/articles`}>
          {article.jur_name}
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          gap: "5px",
          marginBlock: "10px"
        }}
      >
        {article.categories.split(",").map((category, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#e2f7ff",
              borderRadius: "5px",
              color: "#0087bc",
              fontSize: "0.8rem",
              padding: "5px 10px"
            }}
          >
            {category.trim()}
          </div>
        ))}
      </div>
      <div className="article-actions">
        <button className="button-tertiary" onClick={() => onEdit(article.id)}>
          Edit
        </button>
        <button
          className="button-tertiary"
          onClick={() => onDelete(article.id)}
        >
          Delete
        </button>
        <button className="button-secondary" onClick={() => onView(article.id)}>
          View
        </button>
      </div>
    </div>
  );
}
