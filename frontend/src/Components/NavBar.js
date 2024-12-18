import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "flowbite-react";

export default function NavBar() {
  return (
    <div
      className="navBar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "5px",
      }}
    >
      <div
        style={{
          marginRight: "auto",
          paddingLeft: "10px",
          gap: "15px",
          display: "flex",
          fontStyle: "bold",
          fontSize: "20px",
          alignItems: "center",
        }}
      >
        <a href="ecdw">Home </a>
        <a href="ecdw">For You </a>
        <a href="ecdw">Local </a>
      </div>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          paddingRight: "15px",
          gap: "5px",
        }}
      >
        <input
          type="text"
          id="search-navbar"
          className="block w-full p-1 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
        ></input>
        <Button
          style={{
            borderRadius: "5px",
            padding: "5px",
            backgroundColor: "#222",
            width: "250px",
            height: "auto",
          }}
        >
          search
        </Button>
      </div>
    </div>
  );
}
