import React from "react";
import NavBar from "../Components/NavBar";
import TrendsBar from "../Components/TrendsBar";
import LeftDetails from "../Components/LeftDetails";
import RightDetails from "../Components/RightDetails";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ArticleDetails = () => {
  const articles = useSelector((state) => state.articles.articles);
  const id = useParams().id;
  console.log(id);
  const a = articles[id];
  console.log(a);
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

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
        }}
      >
        <div>{formattedDate}</div>
      </div>

      <NavBar />
      <TrendsBar />

      <div style={{ display: "flex", padding: "3%", gap: "10px" }}>
        <div style={{ flex: 2, paddingRight: "10px" }}>
          <LeftDetails article={a} />
        </div>

        <div
          style={{
            flex: 1,
            borderLeft: "1px solid #555",

            paddingLeft: "10px",
            paddingRight: "10px",
            height: "auto",
          }}
        >
          <RightDetails />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
