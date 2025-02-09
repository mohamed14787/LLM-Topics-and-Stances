import React, { useEffect } from "react";
import Trump from "../Assets/trump.jpeg";
import DetailsArticleList from "./DetailsArticleList";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Button } from "flowbite-react";

export default function LeftDetails({ article, all }) {
  const [like, setLike] = React.useState(false);
  const [fetched, setFetched] = React.useState(false);
  const [toggleSummary, setToggleSummary] = React.useState(true);
  const toggle = (x) => {
    setToggleSummary(x);
  };

  useEffect(() => {
    setLike(false);
  }, [article]);
  const toggleLike = () => {
    setLike(!like);
    console.log("like", like);
    fetch(`http://localhost:8000/like?postId=${article.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: article.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFetched(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="left-details">
      <img
        src={article.image_url}
        alt="trump"
        style={{
          width: "100%",
          fontStyle: "bold",
          marginBottom: "40px",
          fontFamily:
            "cnn_sans_display,helveticaneue,Helvetica,Arial,Utkal,sans-serif",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          flexDirection: "column",
        }}
      >
        <div>
          <div
            class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
            style={{ paddingLeft: "15%", marginBottom: "20px" }}
          >
            <ul class="flex flex-wrap -mb-px">
              <li class="me-2">
                <a
                  onClick={() => {
                    toggle(false);
                  }}
                  class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                >
                  Full Article
                </a>
              </li>
              <li class="me-2">
                <a
                  onClick={() => {
                    toggle(true);
                  }}
                  class="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  aria-current="page"
                >
                  Summary
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p
          style={{
            fontSize: "20px",
            textAlign: "left",
            justifyContent: "center",
            width: "80%",
            paddingLeft: "15%",
          }}
        >
          {toggleSummary ? article.summary : article.content}
        </p>
      </div>
      <div
        style={{
          marginLeft: "7%",
          backgroundColor: "#white",
          width: "10%",
          justifyContent: "center",
          gap: "5px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Button
          style={{
            color: like ? "blue" : "black",
          }}
          onClick={toggleLike}
        >
          <p style={{ fontSize: "30px", padding: "6px" }}>Like</p>
          <FaThumbsUp style={{ fontSize: "2em" }} />
        </Button>
      </div>
      <DetailsArticleList articles={all} />
    </div>
  );
}
