const express = require("express");
const employerController = require("../../controllers/employer.controller");
// const employerController = require("../controllers/employer.controller")

const router = express.Router();

router.post("/", employerController.createEmployer);

module.exports = router;