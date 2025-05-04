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
import HomeArticleList from "../Components/HomeArticleList";
import addIndexes from "../addIndexes";
import { groupByDay } from "../addIndexes";
export default function HomePage() {
  const articles1 = useSelector((state) => state.articles.articles || []);
  const articles = addIndexes(articles1);

  const articlesByDay = groupByDay(articles);

  const [selectedDay, setSelectedDay] = useState(
    new Date(articles[300].publishedAt).toLocaleDateString("en-US")
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
  console.log(filteredArticles);

  function handleDayChange(e) {
    setSelectedDay(e.target.value);
  }

  const dateOptions = days.map((day) => new Date(day));

  return (
    <div>
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

      <Search />

      <HomeArticleList articles={articles} />

      <Footer />
    </div>
  );
}
