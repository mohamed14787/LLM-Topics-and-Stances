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
const ArticleDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []); //
  function flattenDictionaryToArray(obj) {
    let result = [];
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        result = result.concat(obj[key]);
      } else {
        result.push(obj[key]);
      }
    }
    return result;
  }
  const articles1 = useSelector((state) => state.articles.articles);
  const x = flattenDictionaryToArray(articles1);
  const id = useParams().id;

  const a = x[id];
  const articlesWithOutIndex = flattenDictionaryToArray(articles1);
  const articles = articlesWithOutIndex.map((article, index) => ({
    ...article,
    index,
  }));

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

  console.log(a);
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  function countTokens(text) {
    return text.split(/\s+/).length;
  }

  const summaryTokens = countTokens(a.summary);
  const contentTokens = countTokens(a.content);
  const summarizationPercentage = Math.round(
    (summaryTokens / contentTokens) * 100
  );

  const summaryReadTime = Math.ceil(summaryTokens / 5);
  const contentReadTime = Math.ceil(contentTokens / 5);
  const savedTimeInSeconds = contentReadTime - summaryReadTime;
  const minutes = Math.floor(savedTimeInSeconds / 60);
  const seconds = savedTimeInSeconds % 60;
  const savedTimeString = `${minutes} minutes ${seconds} seconds`;

  console.log(`Saved Time: ${savedTimeString}`);
  console.log(`Summary Read Time: ${summaryReadTime} seconds`);
  console.log(`Content Read Time: ${contentReadTime} seconds`);

  console.log(`Summarization Percentage: ${summarizationPercentage}%`);

  return (
    <div>
      <div
        style={{
          backgroundColor: "#222",
          height: "4vh",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 10px",
          color: "#fff",
          fontFamily:
            "cnn_sans_display,helveticaneue,Helvetica,Arial,Utkal,sans-serif",
        }}
      >
        <div>{formattedDate}</div>
      </div>

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
                <p>
                  This Article is shortened by {100 - summarizationPercentage}%
                </p>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
