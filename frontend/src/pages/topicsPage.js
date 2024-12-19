import ArticleCard from "../Components/articleCard";
import React from "react";
import NavBar from "../Components/NavBar";
import TrendsBar from "../Components/TrendsBar";
import LeftDetails from "../Components/LeftDetails";
import RightDetails from "../Components/RightDetails";
import { useSelector } from "react-redux";

export default function TopicPage() {
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const articles = useSelector((state) => state.articles.articles);

  return (
    <div className="App">
      <div
        style={{
          backgroundColor: "#222",
          height: "4vh",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 10px",
          color: "#fff",
        }}
      >
        {formattedDate}
      </div>

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
