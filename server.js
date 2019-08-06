//require express and mongoose
const express = require ("express");
const app = express();
const mongoose = require("mongoose");

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bootcampspot_db";
mongoose.connect(MONGODB_URI);

app.get("/", (req, res) => res.send("API running!"));

const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => console.log(`Backend server started on port: ${PORT}`));
