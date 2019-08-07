const express = require ("express");
const router = express.Router();
// this is a protected route, so we bring in the auth middleware.
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
//for the post routes, we want to validate the requests
const { check, validationResult } = require("express-validator");
const request = require("request");

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
        return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);

 } catch(err) {
     console.error(err.message);
     res.status(500).send("Server Error");
 }
});

// @route  GET api/profile
// @desc   Create or update a user profile
// @access private

// we need to use both of the auth and validation middleware at this route
// so we bring them in the second parameter in an array
router.post('/', [
    auth, [
        check("githubusername", "GitHub username is required")
            .not()
            .isEmpty(),
        check("skills", "Skills are required")
            .not()
            .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            website,
            hobbies,
            skills,
            bio,
            githubusername,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        //Build a profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (website) profileFields.website = website;
        if (skills) {
            profileFields.skills = skills.split(",").map(skill => skill.trim());
        };
        if (hobbies) {
            profileFields.hobbies = hobbies.split(",").map(hobby => hobby.trim());
        };
        if (bio) profileFields.bio = bio;
        if (githubusername) profileFields.githubusername = githubusername;

        //Build a social object inside the profile object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;  

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if(profile){
                //update
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, {new: true});
                return res.json(profile);
            }
            //create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch(err){
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route  GET api/profile
// @desc   Get all profiles
// @access public
router.get ('/', async (req,res)=> {
    try {
        const profiles = await Profile.find().populate("user", ["name", "email", "avatar"]);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}
);

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access public
router.get ('/user/:user_id', async (req,res)=> {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "email", "avatar"]);
        if(!profile) {
            return res.status(400).json({ msg: "Profile not found"});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == "ObjectId") {
            return res.status(400).json({ msg: "Profile not found"});
        }
        res.status(500).send("Server error");
    }
}
);

// @route  DELETE api/profile
// @desc   Delete profile, user & posts
// @access private
router.delete('/', auth, async (req,res)=> {
    try {
        // @todo -remove user's posts as well

        // remove profile 
        await Profile.findOneAndRemove({ user: req.user.id});
        // remove user
        await User.findOneAndRemove({ _id: req.user.id });
        return res.json({ msg: "user deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}
);

// @route  GET api/profile/github/:username
// @desc   Get user repos from GitHub
// @access public
router.get('/github/:username', async (req,res)=> {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=10&sort=created:asc&client_id=${process.env.githubClientId}&client_secret=${process.env.githubClientSecret}`,
            method: "GET",
            headers: { "user-agent": "node.js"}
        }

        request (options, (error, response, body) => {
            if(error) console.error(error.message);
            if(response.statusCode !== 200) 
            {
                res.status(404).json({ msg: "No GitHub profile found" });
            }
            return res.json(JSON.parse(body));
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}
);


module.exports = router;