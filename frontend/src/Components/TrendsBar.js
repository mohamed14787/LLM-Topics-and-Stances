import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TrendsBar() {
  return (
    <div
      className="trends"
      style={{
        display: "flex",

        padding: "10px",
        gap: "10px",
        borderTop: "1px solid #555",
        borderBottom: "1px solid #000",
      }}
    >
      <div style={{ padding: "4px" }}>
        <FontAwesomeIcon icon={faChartLine} />
      </div>

      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li class="me-2">
          <a
            href="#"
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
            Trump +
          </a>
        </li>{" "}
        <li class="me-2">
          <a
            href="#"
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
            Barcelona VS Bayern Munich +
          </a>
        </li>{" "}
        <li class="me-2">
          <a
            href="#"
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
            SISI The dictator +
          </a>
        </li>{" "}
        <li class="me-2">
          <a
            href="#"
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
            Black Friday +
          </a>
        </li>{" "}
        <li class="me-2">
          <a
            href="#"
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
            German Polls +
          </a>
        </li>{" "}
        <li class="me-2">
          <a
            href="#"
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
            World War 3 +
          </a>
        </li>{" "}
        <li class="me-2">
          <a
            href="#"
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
            Mike Tyson VS Jake Paul +
          </a>
        </li>{" "}
        <li class="me-2">
          <a
            href="#"
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
            The Queen of England +
          </a>
        </li>{" "}
      </ul>
    </div>
  );
}
