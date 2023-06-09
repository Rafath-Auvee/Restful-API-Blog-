const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 8080;
const app = require("./app");

mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log(`Database connection is successful 🛢`.red.bold);
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
