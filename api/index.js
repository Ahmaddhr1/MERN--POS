const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const ProductRoutes =require("./routes/products")
const cors = require("cors");

dotenv.config();
mongoose.connect(process.env.MONGO_CONNECTION);

app.use(cors());
app.use(express.json());

// Routes
app.use('', ProductRoutes)

app.get("/", (req, res) => {
    res.send("Hello , World!");
});

app.listen("3000", (req, res) => {
  console.log("Server is running on port 3000");
});
