import { Message } from "../Models/message.model.js";
import { Team } from "../Models/team.model.js";
import cloudinary from "../Utils/cloudconfig.js";
import { User } from "../Models/user.model.js";
import { Notification } from "../Models/notification.model.js";
import { io } from "../Utils/socket.js";

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
 
        let imageUrl = "";
        if (image) {
          const uploadResponse = await cloudinary.uploader.upload(image);
          imageUrl = uploadResponse.secure_url;
        }    

        const newMessage = new Message ({
            senderId: userId, 
            receieverId: teamId, 
            text,
            image: imageUrl,
        })
        
        await newMessage.save(); 

        // websocket implementation remaining
        io.to(teamId).emit("LatestMessage", newMessage);

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
        
        const teamDetails = await Team.findById(teamId); 

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
            teamDetails
        });

    } catch (error) {
        console.error("Error fetching team members:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const getNotifications = async (req, res) => {
    const {userId} = req.body; 

    try {
        const user = await User.findById(userId); 

        if(!user){
            res.status(400).json({
                success: false, 
                message: "User Not Found "
            })
            return ;
        }

        const userNotifications = await Notification.find({
            $or: [
              { to: userId },
              { cc: userId }
            ]
          });

        res.status(200).json({
            userNotifications
        })
    } catch (error) {
        console.log(error , "getNotification ne hag diya haiiii !!! ");
        
    }
}

