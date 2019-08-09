const mongoose = require ("mongoose");
const SessionsSchema = new mongoose.Schema({
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
            type: Boolean,
            default: false
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Sessions = mongoose.model("sessions", SessionsSchema);