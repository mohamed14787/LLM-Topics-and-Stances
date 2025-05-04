import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
export default function ArticleItem({ article }) {
  console.log(article.id);
  function daysSincePublished(dateString) {
    const publishedDate = new Date(dateString);
    const now = new Date();
    const msDiff = now - publishedDate;
    return `${Math.floor(msDiff / (1000 * 60 * 60 * 24))} days ago`;
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: "darkgrey",
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "5px",
          alignItems: "center",
          paddingBottom: "5px",
        }}
      >
        <a
          href="#"
          className="inline-block rounded-lg active"
          aria-current="page"
          style={{
            width: "auto",
            height: "30px",
            backgroundColor: "lightgrey",
            borderRadius: "20px / 50%",
            padding: "5px",
            paddingLeft: "20px",
            paddingRight: "20px",
            fontSize: "14px",
            color: "#000",
            alignContent: "center",
          }}
        >
          {article.domain}
        </a>
        <Link to={`/article/${article.index}`}>
          <Button variant="contained" style={{ backgroundColor: "#333" }}>
            Go to the Article
          </Button>
        </Link>
      </div>

      <div style={{ textAlign: "left" }}>
        <p style={{ fontSize: "25px", padding: "10px" }}>{article.title}</p>
        <p style={{ fontSize: "15px", padding: "10px" }}>
          {article.description}
        </p>
        <p style={{ fontSize: "13px", padding: "10px" }}>
          {daysSincePublished(article.publishedAt)}
        </p>
      </div>
    </div>
  );
}
