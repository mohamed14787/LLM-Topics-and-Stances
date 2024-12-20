import trump from "../Assets/trump.jpeg";
import HomeCenterItem from "./homeCenterItem";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Middle() {
  const articles = useSelector((state) => state.articles.articles);
  const firstImageUrl = articles[3]?.image_url;
  const [inputValue, setInputValue] = useState("");
  const [fetched, setFetched] = useState("");

  console.log(firstImageUrl);
  return (
    <div className="leftSideBar">
      <div>
        <img src={firstImageUrl} alt="trump" />
        <a href="#">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {articles[3]?.title}{" "}
          </h2>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {articles[3]?.description}
        </p>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          style={{ backgroundColor: "#222" }}
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
        <button
          onClick={() => {
            console.log("Button clicked");
          }}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Click Me
        </button>
      </div>
      {articles.slice(10, 16).map((article, index) => (
        <HomeCenterItem key={article.id} article={article} id={index + 10} />
      ))}

      <div className="mb-6">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          style={{ fontSize: "20px", paddingTop: "20px" }}
        >
          What are you searching for today?
        </label>
        <input
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={() => {
            fetch("http://localhost:8000/query-pinecone-v2", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ texts: [inputValue] }),
            })
              .then((response) => response.json())
              .then((data) => {
                // Handle the response data
                console.log("fetched");
                console.log(data);
                setFetched(data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
        <HomeCenterItem article={fetched[0]} id={0} />
        <HomeCenterItem article={fetched[1]} id={1} />
      </div>
    </div>
  );
}
