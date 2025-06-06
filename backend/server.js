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
const bookingRoutes = require('./Routes/bookingRoutes');
const serviceRoutes = require('./Routes/serviceRoute')

app.use("/", authRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/service', serviceRoutes);

app.listen(8000);

module.exports = app;





