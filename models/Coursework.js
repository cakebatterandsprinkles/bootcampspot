const mongoose = require ("mongoose");
const CourseworkSchema = new mongoose.Schema({
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
    type: {
        type: String,
        default: "technical"
    },
    submissions: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            submissionlinks: [
                {
                    link: {
                        type: String,
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    }
                }
            ],
            grade: {
                type: String,
            },
            feedback: {
                type: String,
            },
            gradedate: {
                type: Date,
                default: Date.now
            }
        }
    ],
    deadline: {
        type: Date,
        default: Date.now
    }
});

module.exports = Coursework = mongoose.model("coursework", CourseworkSchema);