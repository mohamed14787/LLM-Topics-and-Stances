import ArticleCard from "../Components/articleCard";
import React from "react";
import NavBar from "../Components/NavBar";
import TrendsBar from "../Components/TrendsBar";
import LeftDetails from "../Components/LeftDetails";
import RightDetails from "../Components/RightDetails";
import { useSelector } from "react-redux";
import getFormattedDate from "../FormattedDate.js";

export default function TopicPage() {
  const articles = useSelector((state) => state.articles.articles);

  return (
    <div className="App">
      <div>
        <NavBar />
      </div>
      <div>
        <TrendsBar />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          padding: "3%",
          width: "80%",
        }}
      >
        {articles
          .slice(20, 70)
          .filter((_, index) => index % 5 === 0)
          .map((article, index) => (
            <ArticleCard key={index} article={article} id={index * 5 + 20} />
          ))}
      </div>
    </div>
  );
}
