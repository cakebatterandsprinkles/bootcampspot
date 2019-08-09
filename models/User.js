const mongoose = require ("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "student"
    },
    university: {
        type: String,
        default: "University of Central Florida",
        required: true
    },
    program: {
        type: String,
        default: "Full Stack Web Development",
        required: true
    },
    subprogram: {
        type: String,
        default: "Full Time",
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("user", UserSchema);