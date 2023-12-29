import React from "react";

///The CarouselItem component is designed to display a pair of data related to planets or people in a carousel format. It checks if the data is available, and if so, it creates a flip-box for each item, showing information such as name, height, mass, gender, climate, gravity, or population on the front and back of the box.
const CarouselItem = ({ planetsPair }) => {
  if (!planetsPair || !Array.isArray(planetsPair)) {
    return (
      <p
        style={{
          textAlign: "center",
          color: "white",
          fontFamily: "Work Sans",
          fontSize: "24px",
          fontWeight: "700",
        }}
      >
        No additional data are available
      </p>
    );
  }

  return (
    <>
      <div style={{ display: "flex", gap: "50px" }}>
        {console.log(planetsPair, "planetsPair")}
        {planetsPair?.map((peopleORPlanet) => {
          return (
            <>
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
                      {peopleORPlanet.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "Work Sans",
                        fontSize: "18px",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {peopleORPlanet.height || peopleORPlanet.climate}
                    </p>
                    <p
                      style={{
                        fontFamily: "Work Sans",
                        fontSize: "18px",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {peopleORPlanet.mass || peopleORPlanet.gravity}
                    </p>
                    <p
                      style={{
                        fontFamily: "Work Sans",
                        fontSize: "18px",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {peopleORPlanet.gender || peopleORPlanet.population}
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
                      {peopleORPlanet.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "Work Sans",
                        fontSize: "18px",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {peopleORPlanet.height || peopleORPlanet.climate}
                    </p>
                    <p
                      style={{
                        fontFamily: "Work Sans",
                        fontSize: "18px",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {peopleORPlanet.mass || peopleORPlanet.gravity}
                    </p>
                    <p
                      style={{
                        fontFamily: "Work Sans",
                        fontSize: "18px",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {peopleORPlanet.gender || peopleORPlanet.population}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default CarouselItem;
