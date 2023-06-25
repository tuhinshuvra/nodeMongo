const { createApplicationService, getApplicationService, updateApplicationService } = require("../services/application.services")


exports.createApplication = async (req, res, next) => {
    try {
        const result = await createApplicationService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully created the application",
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Could not save the application"
        })
    }
}

exports.getApplication = async (req, res, next) => {
    try {
        const application = await getApplicationService(req.body);
        res.status(200).json({
            status: "success",
            message: application
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Could not find the application"
        })
    }
}

exports.getAnApplicationById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const application = await getApplicationService(id);

        if (!application) {
            return res.status(400).json({
                status: "fail",
                error: "could not find the application by id"
            })
        }

        res.status(200).json({
            status: "success",
            message: application
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Could not find the application"
        })
    }
}

exports.updateApplication = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await updateApplicationService(id, req.body);

        console.log(result);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Could not update the application with the id"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully updated the application"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Could not update the application"
        })
    }
}