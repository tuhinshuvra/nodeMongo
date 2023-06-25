const Job = require("../models/Jobs");
const Employer = require("../models/Employer");


exports.getJobsService = async (filters, queries) => {
    const jobs = await Job.find({})
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)

    const totalJobs = await Job.countDocuments(filters)
    const pageCount = Math.ceil(totalJobs / queries.limit)
    return { totalJobs, pageCount, jobs }
}

exports.createJobsService = async (data) => {
    const job = await Job.create(data);
    const { _id: jobId, employer } = job;

    const res = await Employer.updateOne(
        { _id: employer.id },
        { $push: { jobs: jobId } }
    )
    console.log(res);
    return job
}

exports.updateAJobsService = async (jobId, data) => {
    const result = await Job.updateOne({ _id: jobId }, { $set: data },
        // const result = await Job.updateOne({ _id: jobId }, { $inc: data }, 
        { runValidators: true }
    );

    // const job = await Job.findById(jobId);
    // const result = await job.set(data).save();
    return result
}

exports.bulkUpdateJobsService = async (data) => {
    // const result = await Job.updateMany({ _id: data.ids }, data, { runValidators: true });
    const jobs = [];
    data.ids.forEach(job => {
        jobs.push(Job.updateOne({ _id: job.id }, job.data));
    });
    const result = await Promise.all(jobs);
    console.log(result);
    return result
}


exports.deleteAJobByIdService = async (id) => {
    const result = await Job.deleteOne({ _id: id })
    return result
}

exports.bulkDeleteJobsService = async (ids) => {
    const result = await Job.deleteMany({ _id: ids })
    return result
}