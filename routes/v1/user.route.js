const express = require("express");
const userController = require("../../controllers/user.controller")

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);

// router.route("/")
//     .post(userController.signup)
//     .get(userController.getUser);

// router.route("/:id")
//     .get(userController.getUserById)
//     .patch(userController.updateUser);

module.exports = router;