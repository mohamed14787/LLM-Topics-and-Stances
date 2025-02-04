import Trump from "../Assets/trump.jpeg";
import { Link } from "react-router-dom";
export default function HomeCenterItem({ article }) {
  if (!article) {
    return null;
  }

  console.log(article);
  return (
    <div>
      <div style={{ display: "flex", textAlign: "left", paddingBottom: "3%" }}>
        <div style={{ flex: 3 }}>
          <Link to={`/article/${article.index}`}>
            <p
              style={{ fontSize: "25px", paddingBottom: "10px" }}
              className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {article.title}
            </p>
          </Link>

          <p style={{ fontSize: "17px", paddingBottom: "10px" }}>
            {article.description ? article.description : article.summary}
          </p>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <img
            src={article.image_url}
            alt="trump"
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
}
