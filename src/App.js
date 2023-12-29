import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/HomePage/Homepage";
import PeopleDetail from "./components/PeoplePlanetDetails/PeopleDetail";
import PlanetDetail from "./components/PeoplePlanetDetails/PlanetDetail";

// It sets up the routing structure of application, ensuring that different components are rendered based on the specified routes.
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/details/people/:id" element={<PeopleDetail />} />
          <Route path="/details/planets/:id" element={<PlanetDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
