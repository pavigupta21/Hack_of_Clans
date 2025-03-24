const express = require("express");
const {createTeam,editTeamDetails,addMemberToTeam,removeMemberFromTeam,deleteTeam,getSortedUsers} = require("../Controllers/teamController");

const router = express.Router();

router.post("/createteam",createTeam);
router.put("/edit/:teamId", editTeamDetails);
router.post("/addMember", addMemberToTeam);
router.post("/removeMember", removeMemberFromTeam);
router.delete("/delete/:teamId", deleteTeam);
router.get("/getSortedUsers/:teamId", getSortedUsers);

module.exports = router;