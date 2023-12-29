import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import fetchData from "../Common/api";
import PersonPlanetCard from "../Common/PersonPlanetCard/PersonPlanetCard";
import Pagination from "../Common/Pagination/Page";

//useEffect: This hook runs when the component mounts to check if there is a cached page in the query client, updating the current page accordingly.

//useQuery: Fetches people data using the fetchData function and manages the loading and error states using the React Query library.

//handlePageChange: Updates the current page when triggered by the Pagination component.

//handleDataCache: Updates the query client with the current page and people data, caching the data for efficient retrieval.

//Rendering: Displays a loading message while data is being fetched, an error message if an error occurs, and a list of person cards with links to individual details pages. The Pagination component is included for navigating through different pages of the people list.

const PeopleList = ({ searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  useEffect(() => {
    const cachedPage = queryClient.getQueryData(["currentPage"]);
    if (cachedPage) {
      setCurrentPage(cachedPage);
    }
  }, [queryClient]);

  const { data, isLoading, error } = useQuery(
    ["peopleData", currentPage, 10],
    () => fetchData("people", currentPage, 10)
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
    queryClient.setQueryData(["peopleData", currentPage, 10], data);
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
        People List
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
        {filteredData.map((person) => (
          <Link to={`/details/people/${person.id}`} key={person.id}>
            <PersonPlanetCard {...person} />
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

export default PeopleList;
