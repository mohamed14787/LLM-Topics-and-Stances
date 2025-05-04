import Trump from "../Assets/trump.jpeg";
import { Link } from "react-router-dom";
export default function RightDetailItem({ article }) {
  if (!article) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          textAlign: "left",
          marginBottom: "20px",
          borderBottom: "1px solid #AAA",
        }}
      >
        <div style={{ flex: 1, display: "flex", alignItems: "start" }}>
          <img
            src={article.image_url}
            alt="trump"
            style={{
              width: "100%",

              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Link to={`/article/${article.index}`}>
            <p
              style={{
                fontSize: "15px",
                paddingBottom: "10px",
                lineHeight: "1.5",
              }}
              className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {article.title}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
