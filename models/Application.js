const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const ApplicationSchema = mongoose.Schema({
    jobs: {
        title: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "Jobs",
            required: true,
        }
    },
    jobSeeker: {
        email: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "JobSeeker",
            required: true,
        }
    },
}, {
    timestamps: true
});

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;