const Employer = require("../models/Employer");


exports.createEmployerService = async (data) => {
    const result = await Employer.create(data);
    return result;
}

exports.getEmployerService = async () => {
    const employers = await Employer.find({});
    // const employers = await Employer.find({}).populate('jobs');
    // const employers = await Employer.find({}).select('-jobs');
    return employers;
}

exports.updateEmployerService = async (id, data) => {
    const result = await Employer.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
}