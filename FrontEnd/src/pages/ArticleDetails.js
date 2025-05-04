import React from "react";
import NavBar from "../Components/NavBar";
import TrendsBar from "../Components/TrendsBar";
import LeftDetails from "../Components/LeftDetails";
import RightDetails from "../Components/RightDetails";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import HomeCenterItem from "../Components/homeCenterItem";
import RightDetailItem from "../Components/rightDetailItem";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import addIndexes from "../addIndexes";
import calculateTimeSaved from "../calculateTimeSaved";
const ArticleDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []); //

  const articles1 = useSelector((state) => state.articles.articles);
  const articles = addIndexes(articles1);
  const id = useParams().id;

  const a = articles[id];

  const articlesWithSameLabel = articles.filter(
    (article) => article.label === a.label
  );

  if (articlesWithSameLabel.length === 0) {
    const labels = [...new Set(articles.map((article) => article.label))];
    const randomLabels = labels.sort(() => 0.5 - Math.random()).slice(0, 2);
    articlesWithSameLabel.push(
      ...articles.filter(
        (article) =>
          randomLabels.includes(article.label) &&
          article.index >= 20 &&
          article.index < 50
      )
    );
  }

  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const { savedTimeString, summarizationPercentage } = calculateTimeSaved(a);

  console.log(savedTimeString, summarizationPercentage);

  return (
    <div>
      <NavBar />
      <TrendsBar />
      <div
        style={{
          textAlign: "left",
          lineHeight: "1.3",
          width: "80%",
          paddingLeft: "3%",
          paddingRight: "5%",
          paddingTop: "2%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p
          style={{ fontSize: "44px" }}
          className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {a.title}
        </p>

        <p>{a.domain}</p>
        <p>published on {formattedDate}</p>
        <div
          style={{
            backgroundColor:
              a.sentiment === "positive"
                ? "green"
                : a.sentiment === "negative"
                ? "red"
                : "lightgrey",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100px",
            height: "30px",
            borderRadius: "10px",
          }}
        >
          <p>{a.sentiment.toUpperCase()}</p>
        </div>
      </div>

      <div style={{ display: "flex", padding: "3%", gap: "10px" }}>
        <div style={{ flex: 3.5, paddingRight: "10px" }}>
          <LeftDetails article={a} all={articles} />
        </div>
        <RightDetails id={id} />
      </div>
    </div>
  );
};

export default ArticleDetails;
