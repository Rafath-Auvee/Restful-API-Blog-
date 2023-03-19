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

//routes
const postRouter = require("./route/post.route.js");
const userRouter = require("./route/user.route.js");
const commentRouter = require("./route/comment.route.js");

app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
