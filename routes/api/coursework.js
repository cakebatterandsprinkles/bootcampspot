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


// @route  GET api/coursework
// @desc   Get all coursework to display date, title and description in the calendar
// @access private
router.get("/", auth, async (req, res) => {
    try {
        const coursework = await Coursework.find();
        return res.json(coursework);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: "Server error"});
    }
});

// @route  POST api/coursework
// @desc   POST coursework data, temporary route
// @access private

router.post('/', [auth,
    [
        check("title", "Title is required")
        .not()
        .isEmpty(),
        check("description", "Description is required")
        .not()
        .isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(user.status !== "instructor")  {
            return res.status(401).send("User not authorized");
        }
        const newCoursework = new Coursework({
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            user: user.id
        });
        await newCoursework.save();
        return res.json(newCoursework);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

// @route  GET api/coursework/grade/:id/:coursework_id
// @desc   Get grade using coursework_id by specific user
// @access private



// @route  POST api/coursework/grade/:id/:coursework_id
// @desc   POST grade using coursework_id by specific user, temporary route
// @access private

router.post('/grade/:id/:coursework_id', [auth,
    [
        check("title", "Title is required")
        .not()
        .isEmpty(),
        check("description", "Description is required")
        .not()
        .isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(user.status !== "instructor")  {
            return res.status(401).send("User not authorized");
        }
        const newCoursework = new Coursework({
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            user: user.id
        });
        await newCoursework.save();
        return res.json(newCoursework);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

module.exports = router;





