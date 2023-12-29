import React from "react";
//The Header component is a simple React component that renders a centered heading with the text "Theme Grill Assignment.
const Header = () => {
  return (
    <>
      {" "}
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
    </>
  );
};
export default Header;
