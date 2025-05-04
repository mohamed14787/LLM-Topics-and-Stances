import React from "react";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RightDetailItem from "./rightDetailItem";
import addIndexes from "../addIndexes";
import calculateTimeSaved from "../calculateTimeSaved";

export default function RightDetails({ id }) {
  const articles1 = useSelector((state) => state.articles.articles);
  const articles = addIndexes(articles1);

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

  return (
    <div
      style={{
        flex: 1,
        paddingLeft: "10px",
        paddingRight: "10px",
        height: "auto",
      }}
    >
      {articlesWithSameLabel.slice(10, 14).map((article) => (
        <RightDetailItem key={article.id} article={article} />
      ))}{" "}
      <div style={{ width: 300, height: 300, marginTop: "70%" }}>
        <CircularProgressbarWithChildren
          value={100 - summarizationPercentage}
          strokeWidth={5}
          color={"blue"}
        >
          <div
            style={{
              marginTop: -5,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              width: 220,
              textAlign: "center",
            }}
          >
            <p>you saved</p>
            <strong style={{ fontSize: 30 }}> {savedTimeString} </strong>
            <p>This Article is shortened by {100 - summarizationPercentage}%</p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
}
