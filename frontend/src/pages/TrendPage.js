import NavBar from "../Components/NavBar";
import TrendsBar from "../Components/TrendsBar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HomeCenterItem from "../Components/homeCenterItem";

export default function TrendPage() {
  const { trend } = useParams();

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
  const elections = articles.filter((article) => article.query.includes(trend));
  console.log(elections);
  return (
    <div>
      <NavBar />
      <TrendsBar />
      <div style={{ width: "70%", margin: "auto", marginTop: "5%" }}>
        {elections.map((article, index) => (
          <HomeCenterItem key={article.id} article={article} id={index} />
        ))}
      </div>
    </div>
  );
}
