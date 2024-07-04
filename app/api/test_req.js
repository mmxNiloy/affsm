import DB_Credentials from "../../Database/DB_Credentials";

const mysql = require("mysql2");

const handler = async (req, res) => {
  // Get the student id and password from the query parameters
  const { id, password } = req.query;

  const connection = mysql.createPool(DB_Credentials);

  const poolPromise = connection.promise();
  const query = `
    SELECT *
    FROM Users
    LIMIT 10;
    `;
  var rows = [];
  var columns = [];
  try {
    [rows, columns] = await poolPromise.execute(query);
  } catch (e) {
    return res.status(500).json({
      message: "Authentication failed. Invalid username or password.",
    });
  }

  res.status(200).json({ message: "Query execution complete.", rows });
};

export default handler;
