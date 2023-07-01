



const { createUserService, getUserService, updateUserService } = require("../services/user.services");

exports.createUser = async (req, res) => {
    try {
        const user = await createUserService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully created the User"
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error,
        });
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await getUserService(req.body);
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Could not find out user"
        })
    }
}

exports.getUserById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await getUserService(id);

        if (!user) {
            return res.status(400).json({
                status: "fail",
                error: "Could not find the user with the id"
            })
        }

        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Could not find out the user"
        })
    }
}

exports.updateUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await updateUserService(id, req.body);

        console.log(result);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Could not update the user with the id"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully updated the user"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Could not update the user"
        })
    }
}