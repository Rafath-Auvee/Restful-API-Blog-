require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
