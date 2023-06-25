const express = require("express");
const jobSeekerController = require("../../controllers/jobSeeker.controller");


const router = express.Router();

router.route("/")
    .post(jobSeekerController.createJobSeeker)
    .get(jobSeekerController.getJobSeeker);

router.route("/:id")
    .get(jobSeekerController.getJobSeekerbyId)
    .patch(jobSeekerController.updateJobSeeker);



module.exports = router;