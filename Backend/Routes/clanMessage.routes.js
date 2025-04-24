import express from 'express'; 
import { verifyToken } from '../Middleware/VerifyToken.js';
import { getMessage, getNotifications, getTeamUsers, sendMessage } from '../Controllers/message.controllers.js';

const router = express.Router();

// router.get("/userteams/:id", verifyToken);
// router.get("/:id", verifyToken);

router.post("/send", verifyToken, sendMessage);
router.post("/get-messages", verifyToken, getMessage);
router.post("/get-team-users",verifyToken, getTeamUsers)
router.post("/get-notifications", verifyToken, getNotifications)

export default router;


