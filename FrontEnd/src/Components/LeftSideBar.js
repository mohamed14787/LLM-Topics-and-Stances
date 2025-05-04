import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function LeftSideBar({ target }) {
  const articles = target;

  return (
    <div className="leftSideBar">
      <div style={{ textAlign: "left", marginBottom: "2%" }}>
        <p style={{ fontSize: "25px", fontStyle: "bold" }}>Daily Briefing</p>
      </div>

      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/article/${articles[0].index}`}>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {articles[0].title}
          </h5>
        </Link>
        <img src={articles[0].image_url} style={{ marginBottom: "30px" }}></img>
        <p
          class="mb-3 font-normal text-gray-700 dark:text-gray-400"
          style={{ fontSize: "20px" }}
        >
          {articles[0].description}{" "}
        </p>
        <Link to={`/article/${articles[0].index}`}>
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
    </div>
  );
}
