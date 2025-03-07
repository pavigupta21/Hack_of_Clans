const teamModel = require("../Models/teamModel.js");


//creating a new team
const createTeam = async (req, res) => {
    try {
        const { name, members, leader, desc } = req.body;
        const newTeam = new teamModel({ name, members, leader, desc });
        await newTeam.save();
        res.status(201).json({ message: "Team created successfully!", team: newTeam });
    } catch (error) {
        res.status(500).json({ error: "Failed to create team"});
    }
};

module.exports = {createTeam};



// Edit Team Details (Name & Description)
const editTeamDetails = async (req, res) => {
    try {
        const { teamId } = req.params; // Extract team ID from URL parameters
        const { name, desc } = req.body; // Extract new name & description from request body

        // Find and update the team
        const updatedTeam = await teamModel.findByIdAndUpdate(
            teamId, 
            { name, desc }, 
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
        const deletedTeam = await teamModel.findByIdAndDelete(teamId);

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


