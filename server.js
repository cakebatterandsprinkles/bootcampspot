//require express and mongoose
const express = require ("express");
const app = express();
const mongoose = require("mongoose");

// Define PORT
const PORT = process.env.PORT || 5000;

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bootcampspot_db";
mongoose.connect(MONGODB_URI);

app.get("/", (req, res) => res.send("API running!"));

// Define Routes 
app.use ("/api/users", require("./routes/api/users"));
app.use ("/api/auth", require("./routes/api/auth"));
app.use ("/api/profile", require("./routes/api/profile"));
app.use ("/api/posts", require("./routes/api/posts"));

// start server
app.listen(PORT, () => console.log(`Backend server started on port: ${PORT}`));
