const express = require("express")
const { signupUser, loginUser, verifyEmail, forgotPassword, resetPassword, logout, checkAuth, google_login, google_signup } = require("../Controllers/userController")
const verifyToken = require("../Middleware/VerifyToken.js")

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

//Manual Login and logout
router.post("/signup",signupUser);

router.post("/login",loginUser);

router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword) 

router.post("/reset-password/:token",resetPassword);

//using Oauth
router.post("/auth/google/signup",google_signup);

router.post("/auth/google/login",google_login);

module.exports = router;