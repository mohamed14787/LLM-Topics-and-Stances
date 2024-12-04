import logo from "./logo.svg";
import "./App.css";
import LeftSideBar from "./Components/LeftSideBar";
import Middle from "./Components/Middle";
import RightSideBar from "./Components/RightSideBar";
import TrendsBar from "./Components/TrendsBar";
import NavBar from "./Components/NavBar";
function App() {
  return (
    <div className="App">
      <div style={{ backgroundColor: "#222", height: "4vh" }}>lol</div>
      <div>
        <NavBar />
      </div>
      <div>
        <TrendsBar />
      </div>
      <div style={{ display: "flex", padding: "3%", gap: "10px" }}>
        <div style={{ flex: 1, paddingRight: "10px" }}>
          <LeftSideBar />
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
          <Middle />
        </div>

        <div style={{ flex: 1, paddingLeft: "10px" }}>
          <RightSideBar />
        </div>
      </div>
    </div>
  );
}

export default App;
