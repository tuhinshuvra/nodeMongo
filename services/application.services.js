const Application = require("../models/Application");


exports.createApplicationService = async (data) => {
    const result = await Application.create(data);
    return result;
}

exports.getApplicationService = async (data) => {
    const jobSeeker = await Application.find({});
    return jobSeeker;
}

exports.updateApplicationService = async (data) => {
    const result = await Application.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
}