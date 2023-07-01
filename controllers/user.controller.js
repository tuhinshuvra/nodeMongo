const {
    signupUserService,
    getUserService,
    updateUserService,
    findUserByEmailService
} = require("../services/user.services");

const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
    try {
        const user = await signupUserService(req.body);

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
/*
1. Check if email and  password are given
2. Load user with email
3. if not user send res
4. compare password
5. if password not correct send res
6. check if user is active
7. if not active send res
8. generate token
9. send user and token
*/

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                status: "fail",
                error: "Please provide your credentials"
            });
        }

        const user = await findUserByEmailService(email);

        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "No user found. Please create an account"
            })
        }


        // const isPasswordValid = user.comparePassword(password, user.password);
        // if (!isPasswordValid) {
        //     return res.status(403).json({
        //         status: "fail",
        //         error: "Password is not correct"
        //     })
        // }

        if (user.status != "active") {
            return res.status(401).json({
                status: "fail",
                error: "Your password is not active yet."
            })
        }

        const token = generateToken(user);
        const { password: pwd, ...others } = user.toObject()

        res.status(200).json({
            status: "success",
            message: "User Successfully Logged in",
            data: {
                user: others,
                token
            }
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