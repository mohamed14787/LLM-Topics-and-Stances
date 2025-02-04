import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function TrendsBar() {
  return (
    <div
      className="trends"
      style={{
        display: "flex",

        padding: "5px",
        gap: "10px",
        borderTop: "1px solid #555",
        borderBottom: "2px solid #000",
        marginLeft: "25px",
        marginRight: "25px",
      }}
    >
      <div style={{ padding: "4px" }}>
        <FontAwesomeIcon icon={faChartLine} />
      </div>

      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li class="me-2">
          <Link
            to={`/Trends/elections`}
            class="inline-block   rounded-lg active"
            aria-current="page"
            style={{
              width: "auto" /* Adjust the width */,
              height: "30px",
              backgroundColor: "#d1d5db",
              borderRadius: "20px / 50%",
              padding: "5px",
              fontSize: "14px",
              color: "#000",
              alignContent: "center",
            }}
          >
            Elections +
          </Link>
        </li>{" "}
        <li class="me-2">
          <Link
            to={`/Trends/parliament`}
            class="inline-block   rounded-lg active"
            aria-current="page"
            style={{
              width: "auto" /* Adjust the width */,
              height: "30px",
              backgroundColor: "#d1d5db",
              borderRadius: "20px / 50%",
              padding: "5px",
              fontSize: "14px",
              color: "#000",
              alignContent: "center",
            }}
          >
            Parliament +
          </Link>
        </li>{" "}
        <li class="me-2">
          <Link
            to={`/Trends/Scholz`}
            class="inline-block   rounded-lg active"
            aria-current="page"
            style={{
              width: "auto" /* Adjust the width */,
              height: "30px",
              backgroundColor: "#d1d5db",
              borderRadius: "20px / 50%",
              padding: "5px",
              fontSize: "14px",
              color: "#000",
              alignContent: "center",
            }}
          >
            Olaf Scholz +
          </Link>
        </li>{" "}
        <li class="me-2">
          <Link
            to={`/Trends/Alice`}
            class="inline-block   rounded-lg active"
            aria-current="page"
            style={{
              width: "auto" /* Adjust the width */,
              height: "30px",
              backgroundColor: "#d1d5db",
              borderRadius: "20px / 50%",
              padding: "5px",
              fontSize: "14px",
              color: "#000",
              alignContent: "center",
            }}
          >
            Alice Weidel +
          </Link>
        </li>{" "}
        <li class="me-2">
          <Link
            to={`/Trends/Immigration`}
            class="inline-block   rounded-lg active"
            aria-current="page"
            style={{
              width: "auto" /* Adjust the width */,
              height: "30px",
              backgroundColor: "#d1d5db",
              borderRadius: "20px / 50%",
              padding: "5px",
              fontSize: "14px",
              color: "#000",
              alignContent: "center",
            }}
          >
            Immigration +
          </Link>
        </li>{" "}
      </ul>
    </div>
  );
}
