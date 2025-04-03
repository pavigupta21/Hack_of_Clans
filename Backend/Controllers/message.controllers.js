import { Message } from "../Models/message.model.js";
import { Team } from "../Models/team.model.js";

export const sendMessage = async (req, res) => {
    const {userId, teamId, text, image} = req.body; 

    try {
        const team = await Team.findById(teamId);
        if(!team){
            res.status(400).json({
                success: false,
                message: "Team not found"
            })
        }

        const isMember = team.teamMembers.some(member => member.member.toString() === userId)
        const isLeader = team.leader.toString() === userId;

        if(!isMember && !isLeader){
            res.status(400).json({
                success: false,
                message: "You are not a team member of this team"
            })
        }

        //one more task pending i.e upload it to cloud 

        const newMessage = new Message ({
            senderId: userId, 
            receieverId: teamId, 
            text,
            image,
        })
        
        await newMessage.save(); 

        // websocket implementation remaining

        res.status(201).json(newMessage);

    } catch (error) {
        console.log(error); 
        res.status(500).json({
            success:false,
            message: "Message bhejne wala kabootar udd na saka :("
        })
    }
};

export const getMessage = async(req, res) => {
    const {userId, teamId} = req.body; 

    try {
        const team = await Team.findById(teamId);
        if(!team){
            res.status(400).json({
                success: false,
                message: "Team not found"
            })
        }

        const isMember = team.teamMembers.some(member => member.member.toString() === userId)
        const isLeader = team.leader.toString() === userId;

        if(!isMember && !isLeader){
            res.status(400).json({
                success: false,
                message: "You are not a team member of this team"
            })
        }

        const messages = await Message.find({
            $or: [
                { senderId: userId, receieverId: teamId }, 
                { senderId: { $ne: userId }, receieverId: teamId } 
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json({
            Team: team,
            Messages:messages
        })

    } catch (error) {
        console.log(error); 
        res.status(500).json({
            success:false,
            message: "Messages could not load :("
        })
    }
}; 

export const getTeamUsers = async(req, res) => {
    const {teamId} = req.body; 
    try {
        const team = await Team.findById(teamId).populate("teamMembers.member", "name email _id").populate("leader", "name email _id");
        
        if(!team){
            res.status(400).json({
                success: false,
                message: "Team not found"
            })
        }

        res.status(200).json({
            success: true,
            teamMembers: team.teamMembers.map(member => member.member),
            leader: team.leader,
        });

    } catch (error) {
        console.error("Error fetching team members:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

