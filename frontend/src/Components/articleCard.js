import Trump from "../Assets/trump.jpeg";
import { Link } from "react-router-dom";
export default function ArticleCard({ article, id }) {
  return (
    <div className="article-card">
      <img src={article.image_url} alt="trump" style={{ width: "100%" }} />

      <Link to={`/article/${id}`}>
        <p style={{ fontSize: "20px", textAlign: "left" }}>{article.title}</p>
      </Link>

      <br />

      <p style={{ fontSize: "15px", textAlign: "left" }}>
        {article.description}
      </p>
    </div>
  );
}
