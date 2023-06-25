const { createEmployerService,
    getEmployerService,
    getEmployerByIdService,
    updateEmployerService } = require("../services/employer.services");

exports.createEmployer = async (req, res, next) => {
    try {
        const result = await createEmployerService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully created the employer"
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Couldn't save the employer"
        })
    }
}
exports.getEmployer = async (req, res, next) => {
    try {
        const employer = await getEmployerService(req.body);
        res.status(200).json({
            status: "success",
            data: employer,
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't get employers"
        })
    }
}

exports.getEmployerById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const employer = await getEmployerByIdService(id);

        if (!employer) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find a employer with this id"
            })
        }

        res.status(200).json({
            status: "success",
            data: employer,
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't get the employer"
        })
    }
}
exports.updateEmployer = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await updateEmployerService(id, req.body);

        console.log(result);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't update the employer with this id"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Sussessfully updated the employer",
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Couldn't update the employer"
        })
    }
}