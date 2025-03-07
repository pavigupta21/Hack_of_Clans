const express = require("express")
const {signupUser,loginUser,google_login,google_signup} = require("../Controllers/userController")


const router = express.Router();

router.post("/signup",signupUser)

router.post("/auth/google/signup",google_signup)

router.post("/auth/google/login",google_login)

router.post("/login",loginUser)

module.exports = router;