import LeftSideBar from "./Components/LeftSideBar";
import Middle from "./Components/Middle";
import RightSideBar from "./Components/RightSideBar";
import TrendsBar from "./Components/TrendsBar";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import ArticleDetails from "./pages/ArticleDetails";
import TopicPage from "./pages/topicsPage";
import HomeCenterItem from "./Components/homeCenterItem";
import logo from "./Assets/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticles } from "./redux/articlesSlice";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrendPage from "./pages/TrendPage";
import { useLocation } from "react-router-dom";
function ScrollToTop() {
  const { pathname } = useLocation(); // Get the current route

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Scroll to top on route change

  return null; // This component doesn't render anything visible
}
function App() {
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.articles);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArticles()); // Fetch articles when the app loads
    }
  }, [dispatch, status]);

  if (status !== "succeeded") {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topics" element={<TopicPage />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/Trends/:trend" element={<TrendPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
