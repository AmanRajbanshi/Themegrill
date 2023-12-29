import React, { useState } from "react";
import "./homepage.css";
import ThemeButton from "../Button/ThemeButton";
import Header from "../Common/Header/Header";
import PeopleList from "../People/PeopleList";
import PlanetList from "../Planet/PlanetList";

//This component is the main page of the application, allowing users to search and view data about people and planets. It includes a header, a search input, and buttons to switch between displaying all data, people, and planets. The component dynamically renders either the list of people, the list of planets, or both based on the selected data type and any applied search term.

const Homepage = () => {
  const [dataType, setDataType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "rgb(46, 69, 115)",
          zIndex: "-1",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0 80px",
          }}
        >
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
          <ThemeButton
            className="button"
            buttonText="All Data"
            onClickHandler={() => setDataType("all")}
          />
          <ThemeButton
            className="button"
            buttonText="People"
            onClickHandler={() => setDataType("people")}
          />
          <ThemeButton
            className="button"
            buttonText="Planets"
            onClickHandler={() => setDataType("planets")}
          />
        </div>

        {dataType === "all" && (
          <>
            <PeopleList searchTerm={searchTerm} />
            <PlanetList searchTerm={searchTerm} />
          </>
        )}

        {dataType === "people" && <PeopleList searchTerm={searchTerm} />}

        {dataType === "planets" && <PlanetList searchTerm={searchTerm} />}
      </div>
    </>
  );
};

export default Homepage;
