const { createJobSeekerService, getJobSeekerService, updateJobSeekerService } = require("../services/jobSeeker.services")

exports.createJobSeeker = async (req, res, next) => {
    try {
        const result = await createJobSeekerService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully created the Jobseeker"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Could not save the jobseeker"
        })
    }
}

exports.getJobSeeker = async (req, res, next) => {
    try {
        const jobSeeker = await getJobSeekerService(req.body);
        res.status(200).json({
            status: "success",
            data: jobSeeker
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Could not find out jobseekers"
        })
    }
}

exports.getJobSeekerbyId = async (req, res, next) => {
    const { id } = req.params;

    try {
        const jobSeeker = await getJobSeekerService(id);

        if (!jobSeeker) {
            return res.status(400).json({
                status: "fail",
                error: "Could not find the jobseeker with the id"
            })
        }

        res.status(200).json({
            status: "success",
            data: jobSeeker
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: "Could not find out the jobseeker"
        })
    }
}

exports.updateJobSeeker = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await updateJobSeekerService(id, req.body);

        console.log(result);

        if (!result.modifiedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Could not update the jobseeker with the id"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully updated the jobseeker"
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            error: "Could not update the jobseeker"
        })
    }
}