// Pagination.js
import React from "react";
import "./page.css";
import ThemeButton from "../../Button/ThemeButton";

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
  handleDataCache,
}) => {
  //handlePageChange: This method is triggered when a pagination button is clicked, updating the current page by either incrementing or decrementing it.

  // handleDataCache: Invoked when a pagination button is clicked, this method is responsible for caching or fetching data associated with the updated page, ensuring efficient data management in the application.
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          padding: "80px",
        }}
      >
        <ThemeButton
          className="button"
          buttonText="Previous"
          onClickHandler={() => {
            handlePageChange(currentPage - 1);
            handleDataCache();
          }}
          disabled={currentPage === 1}
        />

        {Array.from({ length: totalPages }).map((_, i) => (
          <ThemeButton
            key={i}
            className={
              currentPage === i + 1 ? "button-pagination-active" : "button"
            }
            buttonText={i + 1}
            onClickHandler={() => {
              handlePageChange(i + 1);
              handleDataCache();
            }}
            disabled={currentPage === i + 1}
          />
        ))}
        <ThemeButton
          className="button"
          buttonText="Next"
          onClickHandler={() => {
            handlePageChange(currentPage + 1);
            handleDataCache();
          }}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
};

export default Pagination;
