const executeSelectQuery = (query) => {
  return fetch("http://localhost:5000/api/query/select", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: {
      query,
    },
  });
};

module.exports = { executeSelectQuery };
