const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
    check,
    validationResult
} = require("express-validator");

// require models
const Support = require("../../models/Support");

// @route  POST api/support
// @desc   Create a support ticket
// @access private

router.post('/', [auth,
    [
        check("name", "Name is required")
        .not()
        .isEmpty(),
        check("email", "Email is required")
        .not()
        .isEmpty(),
        check("text", "Text is required")
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
        const newSupport = new Support({
            name: req.body.name,
            email: req.body.email,
            text: req.body.text,
            user: req.user.id
        });
        const support = await newSupport.save();
        return res.json(support);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;