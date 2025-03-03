// Sequelize Setup

import dotenv from "dotenv";
dotenv.config();

// const sequelize = require("sequelize");
import sequelize from "sequelize";

const db = new sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mssql",
    encrypt: false,
  }
);

export default db;
