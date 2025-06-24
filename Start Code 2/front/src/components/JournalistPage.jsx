import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleByJournalistId } from "../services/api";

export default function JournalistPage() {
  const { id } = useParams();
  const [journalists, setJournalist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function fetchJournalistData() {
    try {
      setIsLoading(true);
      const data = await getArticleByJournalistId(id);
      if (data) {
        setError("");
        setJournalist(data);
      } else {
        setError("Article not found.");
        setJournalist(null);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch article.");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchJournalistData();
  }, [id]);

  const handleView = (id) => navigate(`/articles/${id}`);

  if (isLoading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!journalists) return <div>No data found with this journalist.</div>;

  return (
    <>
      <h2 style={{ textAlign: "center", marginBlock: "20px" }}>
        {journalists[0].jur_name}
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginInline: "30px",
        }}
      >
        {journalists.map((article) => (
          <ArticleCard key={article.id} article={article} onView={handleView} />
        ))}
      </div>
    </>
  );
}

function ArticleCard({ article, onView }) {
  return (
    <div className="article-card" style={{ minWidth: "300px" }}>
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
          marginBlock: "10px",
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
              padding: "5px 10px",
            }}
          >
            {category.trim()}
          </div>
        ))}
      </div>

      <div className="article-actions">
        <button className="button-secondary" onClick={() => onView(article.id)}>
          View
        </button>
      </div>
    </div>
  );
}
