import React from "react";

//The ThemeButton component is a reusable React button that accepts custom styling (className), button text (buttonText), and an onClickHandler function. When rendered, it creates a button with the specified characteristics.
const ThemeButton = ({ className, buttonText, onClickHandler }) => {
  return (
    <button className={className} onClick={onClickHandler}>
      {buttonText}
    </button>
  );
};

export default ThemeButton;
