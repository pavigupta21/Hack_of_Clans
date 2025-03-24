const teamModel = require("../Models/teamModel.js");
const userModel = require("../Models/userModel.js");
//creating a new team
const createTeam = async (req, res) => {
    try {
        const { name, members, leader, desc } = req.body;
        const newTeam = await teamModel.create({ name, members, leader, desc });
        res.status(201).json({ message: "Team created successfully!", team: newTeam });
    } catch (error) {
        res.status(500).json({ error: "Failed to create team"});
    }
};

module.exports = {createTeam};



// Edit Team Details
const editTeamDetails = async (req, res) => {
    try {
        const { teamId } = req.params; // Extract team ID from URL parameters
        const { name, desc, part_hackathon, req_skills } = req.body; // Extract new name , description,hackathons,req_skills

        // Find and update the team
        const updatedTeam = await teamModel.findOneAndUpdate(
            {_id:teamId}, 
            { name, desc, part_hackathon, req_skills }, 
            { new: true } // Returns the updated document
        );

        if (!updatedTeam) {
            return res.status(404).json({ error: "Team not found" });
        }

        res.status(200).json({ message: "Team details updated successfully", team: updatedTeam });
    } catch (error) {
        res.status(500).json({ error: "Failed to update team details", details: error.message });
    }
};

module.exports = { editTeamDetails };

// Add Member to Team
const addMemberToTeam = async (req, res) => {
    try {
        const { teamId, userId } = req.body;

        // Find the team
        const team = await teamModel.findById(teamId);

        // Check if user is already a member
        if (team.members.includes(userId)) {
            return res.status(400).json({ error: "User is already in the team" });
        }

        // Check if the team has space for new members
        if (team.members.length < team.maxMembers) {
            team.members.push(userId); // Add user to the team
            await team.save();
            return res.status(200).json({ message: "User added to team successfully", team });
        } else {
            return res.status(400).json({ error: `This team cannot have more than ${team.maxMembers} members!` });
        }

    } catch (error) {
        res.status(500).json({ error: "Failed to add member", details: error.message });
    }
};

module.exports = { addMemberToTeam };


// Remove Member from Team
const removeMemberFromTeam = async (req, res) => {
    try {
        const { teamId, userId } = req.body;

        // Find the team
        const team = await teamModel.findById(teamId);

        // Check if the user is in the team
        if (!team.members.includes(userId)) {
            return res.status(400).json({ error: "User is not a member of this team" });
        }

        // Remove the user from the team
        team.members = team.members.filter(member => member.toString() !== userId);
        await team.save();

        res.status(200).json({ message: "User removed from team successfully", team });
    } catch (error) {
        res.status(500).json({ error: "Failed to remove member", details: error.message });
    }
};

module.exports = { removeMemberFromTeam };


// Delete a Team
const deleteTeam = async (req, res) => {
    try {
        const { teamId } = req.params;

        // Delete the team from the database
        const deletedTeam = await teamModel.findOneAndDelete({_id:teamId});

        // If no team was found and deleted, return an error
        if (!deletedTeam) {
            return res.status(404).json({ error: "Team not found" });
        }

        res.status(200).json({ message: "Team deleted successfully", deletedTeam });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete team", details: error.message });
    }
};

module.exports = { deleteTeam };


module.exports = { getSortedTeams };

//Get Sorted Users Based on Matching Skills
const getSortedUsers = async (req, res) => {

    try{
        const { teamId } = req.params; // Get teamId from request params
         
        //Directly fetch the team's required skills
        const team = await teamModel.findById(teamId);
        const teamSkills = team?.req_skills || []; // If no skills, default to an empty array

         //Fetch all users from the database
         let users = await userModel.find();

         //Sort users by the number of matching skills
         users.sort((userA, userB) => {
            const matchesA = userA.skill_set.filter(skill => teamSkills.includes(skill)).length;
            const matchesB = userB.skill_set.filter(skill => teamSkills.includes(skill)).length;
            return matchesB - matchesA; // Sort in descending order (more matches first)
        });
        res.status(200).json({ message: "Users sorted successfully", users });

    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch users", details: error.message });
    }
}

module.exports = { getSortedUsers };


