require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const cors = require("cors");

const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(config.connectionString);

const authRoutes = require('./Routes/authRoutes');

app.use("/", authRoutes);

app.listen(8000);

module.exports = app;





