const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const validator = require('validator');

const JobSeekerSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    fatherName: {
        type: String,
        trim: true,
        required: [true, "Please provide father's name"],
        maxLength: 100,
    },
    motherName: {
        type: String,
        trim: true,
        required: [true, "Please provide mother's name"],
        maxLength: 100,
    },
    phoneMobile: {
        type: String,
        trim: true,
        required: [true, "Please provide Phone/mobile no"],
        maxLength: 15,
    },
    website: {
        type: String,
        lowercase: true,
        validator: [validator.isURL, "Please provide a valid url"]
    },
    imageUrl: {
        type: String,
        validator: [validator.isURL, "Please provide a valid url"]
    },

    presentAddress: {
        type: String,
        trim: true,
        required: [true, "Please provide a present address"],
        maxLength: 300,
    },

    permanentAddress: {
        type: String,
        trim: true,
        required: [true, "Please provide a permanent address"],
        maxLength: 300,
    },
    // employer: {
    //     name: {
    //         type: String,
    //         required: true,
    //     },
    //     id: {
    //         type: ObjectId,
    //         ref: "Employer",
    //         required: true,
    //     }
    // },
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
    // jobs: [{
    //     type: ObjectId,
    //     ref: "Jobs"
    // }],
    // employer: [{
    //     type: ObjectId,
    //     ref: "Employer"
    // }],
    // user: [{
    //     type: ObjectId,
    //     ref: 'User'
    // }],
}, {
    timestamps: true
});

const JobSeeker = mongoose.model("JobSeeker", JobSeekerSchema);
module.exports = JobSeeker;