const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGO_CONNECTION);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello , World!");
});

app.listen("3000", (req, res) => {
  console.log("Server is running on port 3000");
});
