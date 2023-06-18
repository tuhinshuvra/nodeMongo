const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = require("./app");
const dotenv = require("dotenv").config();
const colors = require("colors");

// database connection
mongoose.connect(process.env.ATLAS_URI).then(() => {
  console.log('Database connection is successfull');
})

// server running port
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`App is running on port ${port}`.bgGreen.blue.bold);
})
