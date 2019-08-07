const express = require ("express");
const router = express.Router();
// this is a protected route, so we bring in the auth middleware.
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
//for the post routes, we want to validate the requests
const { check, validationResult } = require("express-validator");

// @route  GET api/profile/me
// @desc   Get current user's profile
// @access private
router.get ('/me', auth, async (req,res)=> {
 try {
    const profile = await Profile
        .findOne({ user: req.user.id})
        .populate("user", ["name", "avatar"]);
    //if there is no profile, return an error message
    if(!profile) {
        return res.status(400).json({ msg: "There is no profile for this user" })
    }
    res.json(profile);

 } catch(err) {
     console.error(err.message);
     res.status(500).send("Server Error");
 }
});


module.exports = router;    