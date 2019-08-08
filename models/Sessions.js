const mongoose = require ("mongoose");
const AttendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attendance: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        remote: {
            type: Number,
            default: "0"
        },
        absence: {
            type: Number,
            default: "0"
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = Attendance = mongoose.model("attendance", AttendanceSchema);