import "../App.css";
import LeftSideBar from "../Components/LeftSideBar";
import Middle from "../Components/Middle";
import RightSideBar from "../Components/RightSideBar";
import TrendsBar from "../Components/TrendsBar";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Search from "../Components/search";
import { useSelector } from "react-redux";
import { useState } from "react";
import DatePicker from "react-datepicker";
import HomeCenterItem from "../Components/homeCenterItem";
import "react-datepicker/dist/react-datepicker.css";
export default function HomePage() {
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
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const articles1 = useSelector((state) => state.articles.articles || []);
  const articlesWithOutIndex = flattenDictionaryToArray(articles1);
  const articles = articlesWithOutIndex.map((article, index) => ({
    ...article,
    index,
  }));
  console.log(articles);
  console.log("hello");
  console.log(articles[0]);
  const articlesByDay = articles.reduce((acc, article, index) => {
    const day = new Date(article.publishedAt).toLocaleDateString("en-US");
    if (!acc[day]) acc[day] = [];
    acc[day].push(article);
    return acc;
  }, {});
  console.log(articlesByDay);
  for (const day in articlesByDay) {
    if (articlesByDay[day].length < 2) {
      delete articlesByDay[day];
    }
  }
  console.log("lol", articlesByDay);
  const [selectedDay, setSelectedDay] = useState(
    new Date(articles[0].publishedAt).toLocaleDateString("en-US")
  );
  const days = Object.keys(articlesByDay).filter(
    (day) => articlesByDay[day].length >= 2
  );

  const filteredArticles =
    selectedDay && articlesByDay[selectedDay]
      ? articlesByDay[selectedDay].map((article) => ({
          ...article,
        }))
      : [];
  console.log("hello");
  console.log(filteredArticles);

  function handleDayChange(e) {
    setSelectedDay(e.target.value);
  }

  const dateOptions = days.map((day) => new Date(day));

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
      <div>
        <NavBar />
      </div>
      <div>
        <TrendsBar />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <span style={{ marginRight: "10px" }}>Choose prefered News Date</span>
        <DatePicker
          selected={selectedDay ? new Date(selectedDay) : null}
          onChange={(date) => setSelectedDay(date.toLocaleDateString("en-US"))}
          includeDates={dateOptions}
          dateFormat="d MMMM yyyy"
        />
      </div>
      <div style={{ display: "flex", padding: "3%", gap: "10px" }}>
        <div style={{ flex: 1, paddingRight: "10px" }}>
          <LeftSideBar target={filteredArticles} />
        </div>

        <div
          style={{
            flex: 3,
            borderLeft: "1px solid #555",
            borderRight: "1px solid #000",
            paddingLeft: "10px",
            paddingRight: "10px",
            height: "auto",
          }}
        >
          <Middle target={filteredArticles} />
        </div>

        <div style={{ flex: 1, paddingLeft: "10px" }}>
          <RightSideBar target={filteredArticles} />
        </div>
      </div>

      <hr style={{ border: "1px solid #555", margin: "20px 3% 50px 3%" }} />
      <div
        style={{
          width: "70%",
          margin: "auto",
        }}
      >
        {articles.slice(15, 18).map((article, index) => (
          <HomeCenterItem key={article.id} article={article} id={index + 10} />
        ))}
      </div>

      <Search />

      <Footer />
    </div>
  );
}
