const express = require ("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// require express validator to check if the user is sending the data in the requested way
const { check, validationResult } = require ("express-validator");
//bring in the User model
const User = require("../../models/User");

// @route  POST api/users
// @desc   Register User
// @access public
router.post('/',[
    check('name', 'Error: Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please enter a valid e-mail address')
        .isEmail(),
    check('password', 'Please enter a password with 8 or more characters')
        .isLength({ min:8 })
], async (req,res) => {
    //check if there are errors, and return a proper response
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password, status} = req.body;

    try {
    // See if the user exists
        let user = await User.findOne({ email: email });
        if(user){
           return res.status(400).json({ errors: [{ msg: "User already exists"}] });
        }

    // Get users gravatar
        const avatar = gravatar.url(email, {
            //options: s is size, r is rating, d is default
            s: '200', r: 'pg', d: 'mm'
        });

        // create a new User instance
        user = new User({
            name,
            email,
            avatar,
            status,
            password
        });

    // Encrypt password
        //create a salt to do the hashing with (documentation recommends at least 10)
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        // save the new user
        await user.save();

        const profile = new Profile({
            user: user._id,
            skills: [],
            hobbies : [],

        });

        await profile.save();

    // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            process.env.JWTSECRET, 
            {expiresIn: 360000}, 
            (err, token) => {
                if (err) throw err; 
                res.json({ token });
            });

    } catch(err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;