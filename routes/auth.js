const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

router.route("/").post(authController.login);
router.route("/refresh").post(authController.refresh);
router.route("/logout").post(auth, authController.logout);

module.exports = router;
