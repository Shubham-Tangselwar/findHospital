const AuthController = require("../controllers/auth.controller");

const express = require("express");

const router = express.Router();

router.post("/refresh", AuthController.refreshToken);
router.post("/password-reset-Link", AuthController.passwordResetLink);

module.exports = router;
