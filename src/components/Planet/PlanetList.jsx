import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import fetchData from "../Common/api";
import Pagination from "../Common/Pagination/Page";
import PersonPlanetCard from "../Common/PersonPlanetCard/PersonPlanetCard";

//Uses useState to manage the current page (currentPage) for pagination.
// Query Handling (react-query):

// Utilizes the useQuery hook from react-query to fetch data for planets  based on the current page.
// Retrieves cached page data using queryClient.getQueryData and updates the current page accordingly.

// Calculates the total number of pages (totalPages) based on the total count of planets and the number of planets displayed per page (10 in this case).
// Handles page changes through the handlePageChange function, updating the current page.

// Caches the current page data using queryClient.setQueryData to maintain state across page navigation.

// Displays a loading message while data is being fetched (isLoading).
// Displays an error message if there's an issue with the data fetching.
// Displaying Planet Cards:

// Maps over the filtered data (based on the search term) and renders PersonPlanetCard components for each planet.
// Wraps each card in a Link component to navigate to the detailed view of a specific planet when clicked.

const PlanetList = ({ searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  useEffect(() => {
    const cachedPage = queryClient.getQueryData(["currentPage"]);
    if (cachedPage) {
      setCurrentPage(cachedPage);
    }
  }, [queryClient]);

  const { data, isLoading, error } = useQuery(
    ["planetsData", currentPage, 10],
    () => fetchData("planets", currentPage, 10)
  );

  const totalPages = data ? Math.ceil(data.count / 10) : 0;
  const results = data ? data.results : [];
  const filteredData = results
    ? results.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDataCache = () => {
    queryClient.setQueryData(["currentPage"], currentPage);
    queryClient.setQueryData(["planetsData", currentPage, 15], data);
  };

  if (isLoading)
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
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1
        style={{
          fontFamily: "Work Sans",
          fontSize: "48px",
          fontWeight: "600",
          lineHeight: "63.84px",
          textAlign: "center",
          color: "white",
        }}
      >
        Planet List
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
          width: "100%",
        }}
      >
        {filteredData.map((planets) => (
          <Link to={`/details/planets/${planets.id}`} key={planets.id}>
            <PersonPlanetCard {...planets} />
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        handleDataCache={handleDataCache}
      />
    </div>
  );
};

export default PlanetList;
