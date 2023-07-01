const express = require("express");
const userController = require("../../controllers/user.controller")

const router = express.Router();

router.route("/")
    .post(userController.createUser)
    .get(userController.getUser);

router.route("/:id")
    .get(userController.getUserById)
    .patch(userController.updateUser);

module.exports = router;