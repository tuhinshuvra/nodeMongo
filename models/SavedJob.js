const mongoose = require('mongoose')
const validator = require('validator');

const SavedJobSchema = mongoose.Schema({
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

const SavedJob = mongoose.model("SavedJob", SavedJobSchema);
module.exports = SavedJob;