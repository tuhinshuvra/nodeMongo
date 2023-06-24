const { getJobsService,
    createJobsService,
    updateAJobsService,
    bulkUpdateJobsService,
    deleteAJobByIdService,
    bulkDeleteJobsService }
    = require("../services/job.services")

exports.getJobs = async (req, res, next) => {
    try {
        // const jobs = await Job
        //   .where("title").equals(/\w/)
        //   .where("salary").gte("40000")
        //   .limit(10).sort({ salary: -1 })

        // const jobs = await getJobsService()
        let filters = { ...req.query };

        // sort, page, limit => exclude
        const excludeFields = ['sort', 'page', 'limit']
        excludeFields.forEach(field => delete filters[field])

        let filterString = JSON.stringify(filters)
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        filters = JSON.parse(filterString)
        console.log("filterString : ", filters);

        const queries = {}
        if (req.query.sort) {
            // title,salary ==> title salary
            const sortBy = req.query.sort.split(',').join(' ')
            queries.sortBy = sortBy
            // console.log("Queries : ", queries);
        }
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            queries.fields = fields
        }




        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;


            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit)
        }



        const jobs = await getJobsService(filters, queries);

        res.status(200).json({
            status: "success",
            data: jobs
        })

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "can't get the data",
            error: error.message,
        })
    }
}

exports.createJob = async (req, res, next) => {
    try {
        const result = await createJobsService(req.body);
        // result.logger()

        res.status(200).json({
            status: "Success",
            message: "Data inserted successfully",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Data is not insted, have some error",
            error: error.message
        })
    }
}

exports.updateAJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateAJobsService(id, req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully updated"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could not update the job",
            error: error.message
        })
    }
}

exports.bulkUpdateJob = async (req, res, next) => {
    try {
        const result = await bulkUpdateJobsService(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully updated"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could not update the job",
            error: error.message
        })
    }
}

exports.deleteAJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteAJobByIdService(id);
        console.log("deleteAJobById : ", result);
        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete the job"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the job"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could not delete the job",
            error: error.message
        })
    }
}

exports.bulkDeleteJob = async (req, res, next) => {
    try {
        const result = await bulkDeleteJobsService(req.body.ids);

        console.log("bulkDeleteJob : ", result);
        if (!result.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete the job"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the given jobs"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Could not delete the given jobs",
            error: error.message
        })
    }
}
exports.fileUpload = async (req, res) => {
    try {
        // res.status(200).json(req.file)
        res.status(200).json(req.files)
    } catch (error) {

    }
}