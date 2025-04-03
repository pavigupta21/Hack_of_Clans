import express from 'express'; 
import { verifyToken } from '../Middleware/VerifyToken.js';
import { getMessage, getTeamUsers, sendMessage } from '../Controllers/message.controllers.js';

const router = express.Router();

// router.get("/userteams/:id", verifyToken);
// router.get("/:id", verifyToken);

router.post("/send", verifyToken, sendMessage);
router.post("/get-messages", verifyToken, getMessage);
router.post("/get-team-users",verifyToken, getTeamUsers)

export default router;


