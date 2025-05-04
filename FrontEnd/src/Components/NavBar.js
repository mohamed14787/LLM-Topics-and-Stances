import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "flowbite-react";
import logo from "../Assets/DEN.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div
      className="navBar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "50px",
        marginLeft: "15px",
        marginRight: "15px",
        fontFamily:
          "cnn_sans_display,helveticaneue,Helvetica,Arial,Utkal,sans-serif",
      }}
    >
      <div
        style={{
          gap: "15px",
          display: "flex",
          fontStyle: "bold",
          fontSize: "20px",
          alignItems: "center",
        }}
      >
        <Link to={`/`}>
          <img
            src={logo}
            alt="logo"
            style={{
              width: "80px",
              margin: 0,
              padding: 0,
              display: "block",
            }}
          />
        </Link>

        <Link to={`/`}>
          <p>Home</p>
        </Link>
        <Link></Link>
        <Link to={`/`}>
          <a href="ecdw">For You</a>
        </Link>
        <Link to={`/`}>
          <a href="ecdw">Local</a>
        </Link>
      </div>
    </div>
  );
}
