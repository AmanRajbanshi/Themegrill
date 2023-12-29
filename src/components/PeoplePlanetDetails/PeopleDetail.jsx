import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CarouselItem from "../Common/CarouselItem/CarouselItem";
import Header from "../Common/Header/Header";
import ThemeButton from "../Button/ThemeButton";

//Fetching Data: Utilizes useEffect to fetch details of the clicked person and additional people based on their IDs

//It Manages state using useState for clickedPeople (details of the clicked person), additionalPeople (details of additional people), and currentSlide (to track the current position in the carousel).
//Next and Previous Slide Navigation:

// handleNextSlide: Advances to the next set of additional people in the carousel.
// handlePrevSlide: Navigates to the previous set of additional people in the carousel.

// Displays a loading message while data is being fetched.
// Provides an error message if there is an issue fetching data.

// Renders detailed information about the clicked person, including name, height, mass, hair color, and films they appeared in.
// Displays a list of films as clickable links.

// Organizes additional people into pairs for a carousel display.
// Allows navigation through the carousel using "Previous" and "Next" buttons.

const PeopleDetail = () => {
  const { id } = useParams();
  const [clickedPeople, setClickedPeople] = useState(null);
  const [additionalPeople, setAdditionalPeople] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchPeopleDetails = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}`);
        const data = await response.json();
        console.log(data, "People data");
        setClickedPeople(data);

        // Fetch details for all planets after the clicked planet's ID
        const nextPeopleIds = Array.from(
          { length: 10 },
          (_, index) => parseInt(id, 10) + index + 1
        );
        const promises = nextPeopleIds.map(async (peopleId) => {
          try {
            const planetResponse = await fetch(
              `https://swapi.dev/api/people/${peopleId}`
            );
            const peopleData = await planetResponse.json();
            return peopleData;
          } catch (error) {
            console.error(`Error fetching people ID ${peopleId}:`, error);
            return null;
          }
        });

        const additionalPeopleData = await Promise.all(promises);
        // Filter out undefined or incomplete data
        const filteredAdditionalPeople = additionalPeopleData.filter(
          (planet) => planet !== null && planet.name !== undefined
        );
        setAdditionalPeople(filteredAdditionalPeople);
      } catch (error) {
        console.error("Error fetching clicked planet data:", error);
      }
    };
    fetchPeopleDetails();
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

  if (!clickedPeople)
    return (
      <p
        style={{
          textAlign: "center",
          color: "white",
          fontFamily: "Work Sans",
          fontSize: "48px",
        }}
      >
        Loading...
      </p>
    );

  // Group additional planets into pairs
  const additionalPlanetPairs = [];
  for (let i = 0; i < additionalPeople.length; i += 4) {
    additionalPlanetPairs.push(additionalPeople.slice(i, i + 4));
  }

  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld,
    films,
  } = clickedPeople;
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
        <Header />
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontFamily: "Work Sans",
          }}
        >
          {height && "People"} Detail
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
              <p>Height</p>
              <p>Mass</p>
              <p>Hair color</p>
              <p>Skin color </p>
              <p>Eye color</p>
              <p>Birth year</p>
              <p>Gender</p>
              <p>Homeworld</p>
            </div>
            <div style={{ fontFamily: "Work Sans" }}>
              <p> {name}</p>
              <p> {height}</p>
              <p> {mass}</p>
              <p> {hair_color}</p>
              <p> {skin_color}</p>
              <p> {eye_color}</p>
              <p> {birth_year}</p>
              <p>{gender}</p>
              <p> {homeworld}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "200px" }}>
            <div></div>
            <div>
              <p style={{ fontFamily: "Work Sans" }}>List of Flims</p>
              <div>
                {films?.map((flim, index) => (
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
          Additional {height && "People"} Carousel
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
            <ThemeButton
              className="button"
              buttonText="Previous"
              onClickHandler={handlePrevSlide}
              disabled={currentSlide === 0}
            />
            <ThemeButton
              className="button"
              buttonText="Next"
              onClickHandler={handleNextSlide}
              disabled={currentSlide === additionalPlanetPairs.length - 1}
            />
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

export default PeopleDetail;
