const User = require("../models/User");

exports.createUserService = async (data) => {
    const user = await User.create(data);
    return user;
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