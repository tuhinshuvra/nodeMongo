const express = require("express");
const employerController = require("../../controllers/employer.controller");

const router = express.Router();


router.route("/")
    .post(employerController.createEmployer)
    .get(employerController.getEmployer);

router.route("/:id")
    .get(employerController.getEmployerById)
    .patch(employerController.updateEmployer);

module.exports = router;