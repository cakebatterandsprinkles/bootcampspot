const express = require ("express");
const router = express.Router();

// @route  GET api/profile
// @desc   Test Route
// @access public
router.get ('/', (req,res)=> res.send('Hello from the profile route'));

module.exports = router;