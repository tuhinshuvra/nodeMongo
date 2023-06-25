const express = require("express");
const applicationController = require("../../controllers/application.controller")

const router = express.Router();

router.route("/")
    .post(applicationController.createApplication)
    .get(applicationController.getApplication);

router.route("/:id")
    .get(applicationController.getAnApplicationById)
    .patch(applicationController.updateApplication);

module.exports = router;