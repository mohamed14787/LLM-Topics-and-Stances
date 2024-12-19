import Trump from "../Assets/trump.jpeg";
import { Link } from "react-router-dom";
export default function HomeCenterItem({ article, id }) {
  console.log(article);
  return (
    <div style={{ display: "flex", textAlign: "left", paddingBottom: "3%" }}>
      <div style={{ flex: 3 }}>
        <p style={{ fontSize: "15px", paddingBottom: "10px" }}>
          {article.domain}
        </p>
        <Link to={`/article/${id}`}>
          <p style={{ fontSize: "25px", paddingBottom: "10px" }}>
            {article.title}
          </p>
        </Link>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <img
          src={article.image_url}
          alt="trump"
          style={{
            width: "80%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}
