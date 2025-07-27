const express = require("express");
const { register, login, sendOtp, verifyOtpAndRegister } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtpAndRegister)

module.exports = router;