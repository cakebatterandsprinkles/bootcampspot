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
        return res.status(500).json({
            msg: "Server error"
        });
    }
});

// @route  POST api/coursework
// @desc   POST coursework data
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
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (user.status !== "instructor") {
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
// @desc   Get grades using coursework_id by specific user
// @access private
router.get('/submission/:id/:coursework_id', auth, async (req, res) => {
    try {
        const coursework = await Coursework.findById(req.params.coursework_id);
        const user = await User.findById(req.user.id).select("-password");
        if (user.id !== req.user.id) {
            return res.status(401).send("User not authorized");
        }

        const userSubmission = coursework.submissions.filter(s => s.user.toString() === user.id)[0];
        return res.json(userSubmission);
    
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

// @route  POST api/coursework/submission/:id/:coursework_id
// @desc   POST submission links by using coursework_id and user id
// @access private

router.post('/submission/:id/:coursework_id', [auth,
    [
        check("links", "Link is required")
        .not()
        .isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        const coursework = await Coursework.findById(req.params.coursework_id);
        const user = await User.findById(req.user.id).select("-password");
        if (user.id !== req.user.id) {
            return res.status(401).send("User not authorized");
        }

        const userSubmission = coursework.submissions.filter(s => s.user.toString() === user.id)[0];

        if (userSubmission) {
            userSubmission.submissionlinks = req.body.links;
            await coursework.save();
            return res.json(userSubmission);
        } else {
            const newSubmission = {
                user: user.id,
                submissionlinks: req.body.links
            };
            coursework.submissions.push(newSubmission);
            await coursework.save();
            return res.json(newSubmission);
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

// @TODO
// @route  POST api/coursework/grade/:id/:coursework_id
// @desc   POST grade & feedback using coursework_id by specific user
// @access private

router.post('/grade/:id/:coursework_id', [auth,
    [
        check("grade", "Grade is required")
        .not()
        .isEmpty(),
        check("feedback", "Feedback is required")
        .not()
        .isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        const coursework = await Coursework.findById(req.params.coursework_id);
        const user = await User.findById(req.user.id).select("-password");
        if (user.status !== "instructor") {
            return res.status(401).send("User not authorized");
        }

        const userSubmission = coursework.submissions.filter(s => s.user.toString() === req.params.id)[0];

        if (userSubmission) {
            userSubmission.grade = req.body.grade;
            userSubmission.feedback = req.body.feedback;
            await coursework.save();
            return res.json(userSubmission);
        }
        // check if there are any submission links, return an error if there is not
        else  {
            return res.status(404).send("Coursework not submitted");
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

module.exports = router;