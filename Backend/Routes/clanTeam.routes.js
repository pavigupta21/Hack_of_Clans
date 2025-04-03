import express from 'express'; 
import { verifyToken } from '../Middleware/VerifyToken.js';
import { acceptReq, createTeam, getUserTeams, joinTeamsReq } from '../Controllers/team.controllers.js';
import { getTeamUsers } from '../Controllers/message.controllers.js';

const router = express.Router();

router.post("/createteam", verifyToken, createTeam);
router.post("/joinreq", verifyToken, joinTeamsReq );
router.post("/acceptreq", verifyToken, acceptReq );
router.post("/getteams", verifyToken, getUserTeams)

export default router;