const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
    check,
    validationResult
} = require("express-validator");

// require models
const User = require("../../models/User");
const Session = require("../../models/Sessions");

// @route  GET api/sessions
// @desc   Get all sessions
// @access private

router.get("/", auth, async (req, res) => {
    try {
        const session = await Session.find().select("-attendance");
        return res.json(session);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            msg: "Server error"
        });
    }
});

// @route  GET api/sessions
// @desc   Get all sessions
// @access private

router.get("/:id", auth, async (req, res) => {
    try {
        const session = await Session.findById(req.params.id).select("-attendance");
        return res.json(session);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            msg: "Server error"
        });
    }
});

// @route  POST api/sessions
// @desc   Post sessions if you are instructor
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
        const newSession = new Session({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            user: user.id
        });
        await newSession.save();
        return res.json(newSession);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

// @route  GET api/sessions/attendance/:id
// @desc   Get attendance of users by id
// @access private
router.get('/attendance/:id', auth, async (req, res) => {
    try {
        const sessions = await Session.find();
        const user = await User.findById(req.user.id).select("-password");
        if (user.id !== req.user.id) {
            return res.status(401).send("User not authorized");
        }

        const userAttendances = sessions
            .map(session => session.attendance.filter(s => s.user.toString() === user.id)[0])
            .map(attendance => {
                return {
                    remote: attendance.remote
                }
            });
        return res.json(userAttendances);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

// @route  POST api/sessions/attendance/:session_id/:id
// @desc   Change attendance of users by id
// @access private
router.post('/attendance/:session_id/:id', [auth,
    [
        check("remote", "Remote status is required")
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
        const session = await Session.findById(req.params.session_id);
        const user = await User.findById(req.user.id).select("-password");
        if (user.id !== req.user.id || user.status !== "instructor") {
            return res.status(401).send("User not authorized");
        }

        const userAttendance = session.attendance.filter(s => s.user.toString() === user.id)[0];

        if (userAttendance) {
            userSubmission.remote = req.body.remote;
            await coursework.save();
            return res.json(userAttendance);
        } else {
            const newAttendance = {
                user: user.id,
                remote: req.body.remote
            };
            session.attendance.push(newAttendance);
            await coursework.save();
            return res.json(newAttendance);
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});


module.exports = router;