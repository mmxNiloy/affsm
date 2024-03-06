const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
import Cookies from "cookies";
import DB_Credentials from "../../../../Database/DB_Credentials";
import User from "../../../../models/User";
import { executeSelectQuery } from "../../../../Database/DBConnection";

const encodeMessage = (message) => {
  // Prime encoding, avoid for better security
  // Uses a permutation of primes to encode the id(message)
  // Only encode valid evaluator id
  const msg = message.toString() + "";
  if (msg.length != 8) {
    return msg;
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(msg);
  const positions = [19, 7, 3, 31, 23, 29, 2, 17];
  const bytes = [];
  for (let i = 0; i < 32; i++) bytes.push(Math.floor(Math.random() * 16));
  for (let i = 0; i < data.length; i++) bytes[positions[i]] = data[i];
  //console.log('bytes', new Uint8Array(bytes))
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const handler = async (req, res) => {
  const cookies = new Cookies(req, res);

  // Get the student id and password from the query parameters
  const { id, password } = req.query;

  const query = `
    SELECT *
    FROM Users
    WHERE user_id = ${id} AND password = '${password}';
    `;
  var rows = [];
  var columns = [];
  try {
    const queryRes = await executeSelectQuery(query);

    const data = await queryRes.json();
    [columns, rows] = data;
  } catch (e) {
    return res.status(500).json({
      message: "Authentication failed. Invalid username or password.",
    });
  }

  if (rows.length === 0) {
    return res.status(500).json({
      message: "Authentication failed. Invalid username or password.",
    });
  }

  const studentQuery = `
    SELECT *
    FROM StudentInformations
    WHERE user_id = ${id};
    `;

  try {
    [rows, columns] = await executeSelectQuery(query);
  } catch (e) {
    return res.status(500).json({
      message: "Database error.",
    });
  }

  if (rows.length === 0) {
    return res.status(500).json({
      message: "Invalid Credentials.",
    });
  }

  const user = new User();
  user.buildFromRow(rows[0]);
  user.password = "";

  const token = jwt.sign({ user }, process.env.TOKEN_KEY, {
    expiresIn: "1h",
  });

  const encodedID =
    encodeMessage(user.user_id + "") +
    encodeMessage((Date.now() % 1000000).toString().padStart(8, "0"));

  cookies.set(process.env.MY_SECRET_USER_KEY + encodedID, token);

  console.log("Login successful");

  return res
    .status(200)
    .json({ message: "Authentication successful!", secret: encodedID });
};

export default handler;
