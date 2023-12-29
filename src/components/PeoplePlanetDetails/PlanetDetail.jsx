import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CarouselItem from "../Common/CarouselItem/CarouselItem";

//same as people details Component description

const PlanetDetail = () => {
  const { id } = useParams();
  const [clickedPlanet, setClickedPlanet] = useState(null);
  const [additionalPlanets, setAdditionalPlanets] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchPlanetDetails = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/planets/${id}`);
        const data = await response.json();
        setClickedPlanet(data);

        // Fetch details for all planets after the clicked planet's ID
        const nextPlanetIds = Array.from(
          { length: 10 },
          (_, index) => parseInt(id, 10) + index + 1
        );
        const promises = nextPlanetIds.map(async (planetId) => {
          try {
            const planetResponse = await fetch(
              `https://swapi.dev/api/planets/${planetId}`
            );
            const planetData = await planetResponse.json();
            return planetData;
          } catch (error) {
            console.error(`Error fetching planet ID ${planetId}:`, error);
            return null;
          }
        });

        const additionalPlanetsData = await Promise.all(promises);
        // Filter out undefined or incomplete data
        const filteredAdditionalPlanets = additionalPlanetsData.filter(
          (planet) => planet !== null && planet.name !== undefined
        );
        setAdditionalPlanets(filteredAdditionalPlanets);
      } catch (error) {
        console.error("Error fetching clicked planet data:", error);
      }
    };
    fetchPlanetDetails();
  }, [id]);

  const handleNextSlide = () => {
    const nextSlide = currentSlide + 1;
    if (nextSlide < additionalPlanetPairs.length) {
      setCurrentSlide(nextSlide);
    }
  };

  const handlePrevSlide = () => {
    const prevSlide = currentSlide - 1;
    if (prevSlide >= 0) {
      setCurrentSlide(prevSlide);
    }
  };

  if (!clickedPlanet)
    return (
      <p
        style={{
          textAlign: "center",
          color: "black",
          fontFamily: "Work Sans",
          fontSize: "48px",
        }}
      >
        Loading...
      </p>
    );

  // Group additional planets into pairs
  const additionalPlanetPairs = [];
  for (let i = 0; i < additionalPlanets.length; i += 4) {
    additionalPlanetPairs.push(additionalPlanets.slice(i, i + 4));
  }

  const {
    name,
    rotation_period,
    orbital_period,
    diameter,
    gravity,
    surface_water,
    climate,
    terrain,
    population,
    films,
    residents,
  } = clickedPlanet;
  return (
    <div>
      <div
        style={{
          backgroundColor: "rgb(46, 69, 115)",
          zIndex: "-1",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          padding: " 80px",
        }}
      >
        <h1
          style={{
            fontFamily: "Work Sans",
            fontSize: "48px",
            fontWeight: "600",
            textAlign: "center",
            color: "white",
          }}
        >
          Theme Grill Assignment
        </h1>
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "Work Sans",
          }}
        >
          {climate && "Planet"} Detail
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "200px",
            color: "white",
            backgroundColor: "rgb(114, 156, 242)",
            padding: "10px 80px",
            borderRadius: "8px",
            fontSize: "20px",
          }}
        >
          <div
            style={{ display: "flex", gap: "100px", fontFamily: "Work Sans" }}
          >
            <div>
              <p>Name</p>
              <p>Climate</p>
              <p>Terrain</p>
              <p>Population</p>
              <p>Rotation Period</p>
              <p>Orbital Period</p>
              <p>Diameter</p>
              <p>Gravity</p>
              <p>Surface Water</p>
            </div>
            <div style={{ fontFamily: "Work Sans" }}>
              <p> {name}</p>
              <p> {climate}</p>
              <p> {terrain}</p>
              <p> {population}</p>
              <p> {rotation_period}</p>
              <p> {orbital_period}</p> <p> {diameter}</p>
              <p> {gravity}</p>
              <p>{surface_water}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "200px" }}>
            <div>
              <p style={{ fontFamily: "Work Sans" }}>List of Residents</p>
              <div>
                {residents.map((resident, index) => (
                  <p
                    key={index}
                    style={{ listStyleType: "none", color: "white" }}
                  >
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontFamily: "Work Sans",
                      }}
                      href={resident}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      resident {index + 1}
                    </Link>
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "Work Sans" }}>List of Flims</p>
              <div>
                {films.map((flim, index) => (
                  <p
                    key={index}
                    style={{ listStyleType: "none", color: "white" }}
                  >
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontFamily: "Work Sans",
                      }}
                      href={flim}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      flim {index + 1}
                    </Link>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "rgb(46, 69, 115)",
          zIndex: "-1",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          padding: " 80px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "Work Sans",
          }}
        >
          Additional {climate && "Planet"} Carousel
        </h2>
        <div
          style={{
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              textAlign: "center",
              gap: "50px",
            }}
          >
            <button
              className="button"
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
            >
              Previous
            </button>
            <button
              className="button"
              onClick={handleNextSlide}
              disabled={currentSlide === additionalPlanetPairs.length - 1}
            >
              Next
            </button>
          </div>
          {console.log(
            additionalPlanetPairs[currentSlide],
            "additionalPlanetPairs[currentSlide]"
          )}
          <CarouselItem planetsPair={additionalPlanetPairs[currentSlide]} />
        </div>
      </div>
    </div>
  );
};

export default PlanetDetail;
