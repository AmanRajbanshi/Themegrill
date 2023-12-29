// PersonPlanetCard.js
import React from "react";
import "./personplanetcard.css";

//The PersonPlanetCard component represents a card with a flip-box design, displaying information about a person or planet. It takes properties such as id, name, height, mass, gender, climate, terrain, and population to dynamically render the content on both the front and back faces of the card.

const PersonPlanetCard = ({
  id,
  name,
  height,
  mass,
  gender,
  climate,
  terrain,
  population,
}) => {
  console.log(id, name, height, mass, gender);
  return (
    <div className="flip-box">
      <div className="flip-box-inner">
        <div className="flip-box-front">
          <p
            style={{
              fontFamily: "Work Sans",
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {id}
          </p>
          <p
            style={{
              fontFamily: "Work Sans",
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {name}
          </p>
          <p
            style={{
              fontFamily: "Work Sans",
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {height || climate}
          </p>
          <p
            style={{
              fontFamily: "Work Sans",
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {mass || terrain}
          </p>
          <p
            style={{
              fontFamily: "Work Sans",
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {gender || population}
          </p>
        </div>
        <div className="flip-box-back">
          <p
            style={{
              fontFamily: "Work Sans",
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {id}
          </p>
          <p
            style={{
              fontFamily: "Work Sans",
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {name}
          </p>
          <p
            style={{
              fontFamily: "Work Sans",
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {height || climate}
          </p>
          <p
            style={{
              fontFamily: "Work Sans",
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {mass || terrain}
          </p>

          <p
            style={{
              fontFamily: "Work Sans",
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {gender || population}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonPlanetCard;
