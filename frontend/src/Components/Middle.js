import trump from "../Assets/trump.jpeg";
import HomeCenterItem from "./homeCenterItem";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Label, Textarea } from "flowbite-react";

export default function Middle({ target }) {
  const articles = target;
  const firstImageUrl = articles[1]?.image_url;
  const [inputValue, setInputValue] = useState("");
  const [fetched, setFetched] = useState("");
  const percentage = 66;

  const config = {
    percent: 55,
    colorSlice: "#E91E63",
    colorCircle: "#f1f1f1",
    fontWeight: 100,
    number: false, // turn off the percentage animation first
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    console.log("Sending:", JSON.stringify({ query: inputValue }));

    fetch("http://localhost:8000/vote2", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Fixed Content-Type
      body: JSON.stringify({ query: inputValue }),
      // mode: "cors", // Correct JSON format
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Convert response to JSON
      })
      .then((data) => {
        console.log("Response received:", data);
        setFetched(data); // Update state with the response
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log(firstImageUrl);
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <div>
          <img
            src={firstImageUrl}
            style={{ marginBottom: "40px" }}
            alt="trump"
          />
          <Link to={`/article/${articles[1].index}`}>
            <h2
              className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              style={{ fontSize: "35px", lineHeight: "1.3" }}
            >
              {articles[1]?.title}{" "}
            </h2>
          </Link>
          <p
            className="mb-3 font-normal text-gray-700 dark:text-gray-400"
            style={{ fontSize: "22px" }}
          >
            {articles[1]?.description}
          </p>
          <Link to={`/article/${articles[1].index}`}>
            <button
              type="submit"
              className="text-white  end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 
                    font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              style={{
                backgroundColor: "#222",
                display: "flex",
                alignItems: "center",
              }}
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
            </button>
          </Link>
        </div>
        <div style={{ width: "80%" }}>
          <div className="mb-2 block">
            <Label
              htmlFor="large"
              value="What Party are you preferably vote for ?"
            />
          </div>
          <Textarea
            id="comment"
            placeholder="I am AI Assistant to help you you  decide on what party to vote for"
            required
            rows={4}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="text-white  end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 
                    font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            style={{ backgroundColor: "#222" }}
            onClick={handleSubmit}
          >
            Try Me
          </button>
        </div>
        <p>{fetched}</p>

        {/* {articles.slice(10, 12).map((article, index) => (
          <HomeCenterItem key={article.id} article={article} id={index + 10} />
        ))} */}
      </div>
    </div>
  );
}
