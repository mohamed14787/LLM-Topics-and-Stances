import React from "react";
import Trump from "../Assets/trump.jpeg";
import DetailsArticleList from "./DetailsArticleList";

export default function LeftDetails({ article }) {
  return (
    <div className="left-details">
      <p style={{ fontSize: "40px", textAlign: "left" }}>{article.title}</p>

      <img
        src={article.image_url}
        alt="trump"
        style={{ width: "85%", fontStyle: "bold" }}
      />

      <p style={{ fontSize: "20px", textAlign: "left", paddingRight: "4%" }}>
        {article.content}
      </p>

      <DetailsArticleList />
    </div>
  );
}
