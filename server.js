//require express and mongoose
const express = require ("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

// Define PORT
const PORT = process.env.PORT || 5000;

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bootcampspot_db";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

// Init Middleware
// Body parser
app.use(express.json({ extended:false }));

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

// Define Routes 
app.use ("/api/users", require("./routes/api/users"));
app.use ("/api/auth", require("./routes/api/auth"));
app.use ("/api/profile", require("./routes/api/profile"));
app.use ("/api/posts", require("./routes/api/posts"));
app.use ("/api/coursework", require("./routes/api/coursework"));
app.use ("/api/sessions", require("./routes/api/sessions"));
app.use ("/api/support", require("./routes/api/support"));

app.use(function (req, res, next) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

// start server
app.listen(PORT, () => console.log(`Backend server started on port: ${PORT}`));
