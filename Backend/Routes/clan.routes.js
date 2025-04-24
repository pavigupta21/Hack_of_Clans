import express from 'express'; 
import { googleLogin, signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth, startupHandler, updateProfile } from '../Controllers/clan.controllers.js';
import { verifyToken } from '../Middleware/VerifyToken.js';

const router = express.Router(); 

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:token",resetPassword);
router.get("/google", googleLogin)
router.post("/startup-page", startupHandler)
router.post("/update-profile", verifyToken, updateProfile)



export default router ; 