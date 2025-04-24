import express from 'express'; 
import { verifyToken } from '../Middleware/VerifyToken.js';
import { createTeam, getUserTeams, joinTeamsReq, acceptReq, inviteMember, acceptInvitation, rejectInvitation } from '../Controllers/team.controllers.js';
import { getTeamUsers } from '../Controllers/message.controllers.js';

const router = express.Router();

router.post("/createteam", verifyToken, createTeam);
router.post("/joinreq", verifyToken, joinTeamsReq );
router.post("/acceptreq", verifyToken, acceptReq );
router.post("/getteams", verifyToken, getUserTeams);
router.post("/send-invitation", verifyToken, inviteMember);
router.post("/accept-invitation", verifyToken, acceptInvitation);
router.post("/reject-invitation", verifyToken, rejectInvitation);

export default router;