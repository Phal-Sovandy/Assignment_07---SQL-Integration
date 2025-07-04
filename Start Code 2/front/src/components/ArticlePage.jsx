import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "../services/api";

export default function ArticlePage() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      setLoading(true);

      const found = await getArticleById(id);
      if (found) {
        setArticle(found);
        setError("");
      } else {
        setArticle(null);
        setError("Article not found.");
      }
    } catch (err) {
      setError("Failed to fetch article.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBlock: "20px" }}>
        {article.title}
      </h2>
      <p style={{ textAlign: "center", color: "grey" }}>{article.content}</p>
      <div style={{margin: "30px"}}>
        <div>
          <strong>Journalist:</strong> <Link to={`/journalists/${article.journalistId}/articles`}>{article.name}</Link>
        </div>
        <div>
          <strong>Category:</strong> {article.category}
        </div>
      </div>
    </div>
  );
}
