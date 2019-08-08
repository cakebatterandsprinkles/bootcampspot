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
                    }
                }
            ],
            grade: {
                type: String,
            },
            feedback: {
                type: String,
            },
            date: {
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