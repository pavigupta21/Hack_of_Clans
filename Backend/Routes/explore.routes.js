import express from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { get50hackathons, get50Users, getHackathons, getTop15Teams, getUsers } from '../Controllers/explore.controllers.js';

const router = express.Router();

router.get("/get-hackathons", verifyToken, getHackathons);
router.get("/get-50-hackathons", verifyToken, get50hackathons);
router.get("/get-users",verifyToken, getUsers);
router.get("/get-50-users", verifyToken, get50Users);
router.get("/get-teams", verifyToken, getTop15Teams)

export default router;





