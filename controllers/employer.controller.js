const { createEmployerService } = require("../services/employer.services");

exports.createEmployer = async (req, res, next) => {
    try {
        const result = await createEmployerService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully created the brand"
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Couldn't save the employer"
        })
    }
}