const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/authToken");

router.route("/login").post(authController.login);

router.route("/me").get(verifyToken, authController.getMe);

module.exports = router;
