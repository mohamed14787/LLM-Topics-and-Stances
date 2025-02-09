import HomeCenterItem from "./homeCenterItem";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

export default function Search() {
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
  const articles1 = useSelector((state) => state.articles.articles || []);
  const articlesWithOutIndex = flattenDictionaryToArray(articles1);
  const articles = articlesWithOutIndex.map((article, index) => ({
    ...article,
    index,
  }));
  const [inputValue, setInputValue] = useState("");
  const [fetched, setFetched] = useState([]);
  const [merged, setMerged] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/query-pinecone-v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: [inputValue] }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFetched(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    if (fetched.length) {
      setMerged(
        articles.filter((article) =>
          fetched.some((f) => f.title === article.title)
        )
      );
    }
  }, [fetched]);

  return (
    <form
      style={{ width: "70%", justifyContent: "center", margin: "auto" }}
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center  pointer-events-none"></div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 
                    rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Articles You are Interested In "
          required
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div style={{ margin: 10, justifyContent: "end", display: "flex" }}>
        <button
          type="submit"
          className="text-white  end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 
                    font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>

      <HomeCenterItem article={merged[0]} id={0} />
      <HomeCenterItem article={merged[1]} id={1} />
    </form>
  );
}
