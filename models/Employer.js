const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const validator = require('validator');

const EmployerSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    companyName: {
        type: String,
        trim: true,
        required: [true, "Please provide company name"],
        maxLength: 150,
    },
    phoneMobile: {
        type: String,
        trim: true,
        required: [true, "Please provide Phone/mobile no"],
        maxLength: 15,
    },
    companyType: {
        type: String,
        enum: ["Govment", "Private", "NGO", "Voluntary", "Others"],
        default: "Private"
    },
    address: {
        type: String,
        validator: [validator.isURL, "Please provide company address"]
    },
    website: {
        type: String,
        lowercase: true,
        validator: [validator.isURL, "Please provide a valid url"]
    },
    companyLogo: {
        type: String,
        validator: [validator.isURL, "Please provide a valid url"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Please provide a company description"],
        maxLength: 1000,
    },
    jobs: {
        title: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "Employer",
            required: true,
        }
    },
}, {
    timestamps: true
});

const Employer = mongoose.model("Employer", EmployerSchema);
module.exports = Employer;