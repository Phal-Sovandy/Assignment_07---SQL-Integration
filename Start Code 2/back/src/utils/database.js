import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT } = process.env;

// TODO
// Create the pool to connect to the database
// Use the database settings from the .env file
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
//   DB_PASSWORD: DB_PASSWORD,
  database: DB_NAME,
  port: PORT,
});

export { pool };
