const JobSeeker = require("../models/JobSeeker");

exports.createJobSeekerService = async (data) => {
    const result = await JobSeeker.create(data);
    return result;
}

exports.getJobSeekerService = async (data) => {
    const jobSeeker = await JobSeeker.find({});
    return jobSeeker;
}

exports.updateJobSeekerService = async (data) => {
    const result = await JobSeeker.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
}