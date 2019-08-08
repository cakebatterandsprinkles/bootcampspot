const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
    check,
    validationResult
} = require("express-validator");

// require models
const User = require("../../models/User");
const Coursework = require("../../models/Coursework");



module.exports = router;