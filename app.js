require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);

//routes
const postRouter = require("./route/post.route.js");
const userRouter = require("./route/user.route.js");
const commentRouter = require("./route/comment.route.js");

app.use("/api/v1/comments", limiter, commentRouter);
app.use("/api/v1/posts", limiter, postRouter);
app.use("/api/v1/users", limiter, userRouter);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
