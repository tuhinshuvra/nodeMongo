const Employer = require("../models/Employer");

exports.createEmployerService = async (data) => {
    const result = await Employer.create(data);
    return result;
}