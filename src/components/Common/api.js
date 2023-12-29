//The api.js file exports a function called fetchData that asynchronously fetches data from the given api (https://swapi.dev) based on the specified resource (e.g., "people" or "planets"), page number, and page size. The retrieved data is then enhanced by adding an id property to each result, calculated based on the item's index and the pagination details. The function returns the modified data, maintaining the original structure with results containing the additional id property.

const fetchData = async (resource, page = 1, pageSize = 10) => {
  const response = await fetch(
    `https://swapi.dev/api/${resource}/?page=${page}`
  );
  const data = await response.json();

  const dataWithId = data.results.map((item, index) => ({
    ...item,
    id: index + 1 + (page - 1) * pageSize,
  }));

  return { ...data, results: dataWithId };
};

export default fetchData;
