const User = require("../models/User");

exports.signupUserService = async (data) => {
    const user = await User.create(data);
    return user;
}

exports.findUserByEmailService = async (data) => {
    return await User.findOne({ email });
}

exports.findUserByEmail = async (email) => {
    return await User.findOne({ email });
}


exports.getUserService = async (data) => {
    const user = await User.find({});
    return user;
}

exports.updateUserService = async (data) => {
    const result = await User.updateOne({ _id: id }, data, {
        runValidators: true
    });
    return result;
}