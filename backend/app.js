import dotenv from "dotenv";
dotenv.config();

import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is open on port", PORT);
});

app.get("/", (req, res, next) => {
  res.send("Server is running");
});

import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
app.use("/users", usersRouter);
app.use("/login", loginRouter);
