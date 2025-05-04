import React, { useState } from "react";
import HomeCenterItem from "./homeCenterItem";

export default function HomeArticleList({ articles }) {
  return (
    <div
      style={{
        width: "70%",
        margin: "auto",
      }}
    >
      {articles.slice(15, 18).map((article, index) => (
        <HomeCenterItem key={article.id} article={article} id={index + 10} />
      ))}
    </div>
  );
}
