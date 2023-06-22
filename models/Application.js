const mongoose = require('mongoose')
const validator = require('validator');

const ApplicationSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },

    jobs: [{
        type: ObjectId,
        ref: "Jobs"
    },]
}, {
    timestamps: true
});

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;