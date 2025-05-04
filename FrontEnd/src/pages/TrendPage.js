import NavBar from "../Components/NavBar";
import TrendsBar from "../Components/TrendsBar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HomeCenterItem from "../Components/homeCenterItem";
import addIndexes from "../addIndexes";
import "../CSS/DetailsPage.css";

export default function TrendPage() {
  const { trend } = useParams();

  const articles1 = useSelector((state) => state.articles.articles || []);
  const articles = addIndexes(articles1);

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
