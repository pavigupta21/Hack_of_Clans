import { v2 as cloudinary } from 'cloudinary';
import { Notification } from '../Models/notification.model.js';
import { Team } from '../Models/team.model.js';
import { User } from '../Models/user.model.js';



export const createTeam = async (req, res) => {
    try {
        const { teamName, hackathon, description, userId, logo: base64Image } = req.body;

        if (!teamName || !hackathon) {
            return res.status(400).json({
                success: false, 
                message: "Team name and hackathon names are required!"
            });
        }

        let logoUrl = null;
        
        if (base64Image) {
            const result = await cloudinary.uploader.upload(base64Image, {
                folder: 'team-logos',
                width: 500,
                height: 500,
                crop: 'fill'
            });
            logoUrl = result.secure_url;
        }

        const team = new Team({
            teamName, 
            hackathon,
            description: description || "", 
            leader: userId,
            teamMembers: [],
            logo: logoUrl
        });

        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "User does not exist"
            });
        }

        await team.save();

        user.teams.push({
            teamId: team._id,
            isLeader: true, 
        });

        await user.save();

        res.status(201).json({
            success: true,
            team
        });

    } catch (error) {
        console.error("Error in create team:", error);
        res.status(500).json({
            success: false, 
            message: "Internal server error in create team"
        });
    }
};

export const updateTeamLogo = async (req, res) => {
    try {
        const { teamId } = req.params;
        
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided"
            });
        }

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team not found"
            });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'team-logos',
            width: 500,
            height: 500,
            crop: 'fill'
        });


        if (team.logo) {
            const publicId = team.logo.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`team-logos/${publicId}`);
        }

        team.logo = result.secure_url;
        await team.save();

        res.status(200).json({
            success: true,
            team,
            message: "Team logo updated successfully"
        });

    } catch (error) {
        console.error("Error updating team logo:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while updating logo"
        });
    }
};

export const joinTeamsReq = async (req, res) => {
    const {teamId, userId} = req.body; 

    try {
        const team = await Team.findById(teamId); 

        if(!team){
            res.status(404).json({
                success: false, 
                message: "Team does not exist"
            })
            return ;
        }

        const user = await User.findById(userId); 

        if(!user){
            res.status(404).json({
                success: false, 
                message: "user does not exist"
            })
            return ;
        }

        const existingRequest = await Notification.findOne({
            to: teamId, from: userId, isReq: false
        });
        
        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: "Join request already sent!" 
            });
        }

        const notify = new Notification({
            to: teamId, 
            from: userId,
            cc: team.leader,
            teamName: team.teamName,
            heading: "Team Join request!",
            senderName: user.name,
            content: `${user.name} wants to join your team ${team.teamName}`,
            isReq: false,
        })

        await notify.save(); 

        res.status(200).json({
            success: true, 
            message: "Request sent successfully!"
        })        
        
    } catch (error) {
        console.log("Error in join req to team : ", error)
        res.status(500).json({
            success:false, 
            message: "Internal sever error aya hai team join req mein !!!"
        })
    }
};

export const acceptReq = async(req, res) => {
    const {userId, teamId} = req.body; 

    try {
        const user = await User.findById(userId); 
        if(!user){
            res.status(404).json({
                success: false, 
                message: "user does not exist"
            })
            return ;
        }
        
        const notification = await Notification.findOneAndDelete({to: teamId, from: userId, isReq:false}); 
        
        if(!notification){
            res.status(400).json({
                success: false , 
                message: "There was no invitation"
            })
            return ; 
        }

        const team = await Team.findById(teamId);
        if(!team){
            res.status(404).json({
                success: false, 
                message: "Team does not exist"
            })
            return ;
        }

        if (team.teamMembers.some(m => m.member.toString() === userId)) {
            return res.status(400).json({ 
                success: false,
                message: "User is already in the team!" 
            });
        }

        team.teamMembers.push({
            member: userId
        })

        await team.save(); 

        user.teams.push({
            teamId: team._id,
            isLeader: false, 
        })

        await user.save();


        res.status(200).json({
            success: true,
            message: "User added successully"
        })


    } catch (error) {
        console.log("Error in accept request : ", error)
        res.status(500).json({
            success:false, 
            message: "Internal sever error aya hai request accept mein !!!"
        })
    }
};

export const getUserTeams = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }

        const teamIds = user.teams.map(team => team.teamId);

        if (teamIds.length === 0) {
            return res.status(200).json({
                success: true,
                teams: [],
                message: "User is not in any team",
            });
        }

        const teams = await Team.find({ _id: { $in: teamIds } }); 

        res.status(200).json({
            success: true,
            teams,
        });

    } catch (error) {
        console.log("Error in getTeams request:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error aya hai getTeams mein !!!",
        });
    }
};

export const inviteMember = async(req, res) => {
    const {teamId, userId } = req.body ;
    try {
        const team = await Team.findById(teamId); 

        if(!team){
            res.status(404).json({
                success: false, 
                message: "Team does not exist"
            })
            return ;
        }

        const user = await User.findById(userId); 

        if(!user){
            res.status(404).json({
                success: false, 
                message: "user does not exist"
            })
            return ;
        }

        const existingRequest = await Notification.findOne({
            to: userId, from: teamId, isReq: true
        });
        
        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: "Join request already sent!" 
            });
        }

        const notify = new Notification({
            to: userId, 
            from: teamId,
            senderName: team.teamName,
            heading: "Team Join request!",
            content: "We kindly request you to join our team as a member",
            isReq: true
        })

        await notify.save(); 

        res.status(200).json({
            success: true, 
            message: "Request sent successfully!"
        })        
        
    } catch (error) {
        console.log("Error in join req to team : ", error)
        res.status(500).json({
            success:false, 
            message: "Internal sever error aya hai team join req mein !!!"
        })
    }
}; 

export const acceptInvitation = async(req, res) => {
    const {userId, teamId } = req.body; 
    console.log(req.body);
    
    try {
        
        const notification = await Notification.findOneAndDelete({to: userId, from: teamId, isReq: true}); 
        
        if(!notification){
            res.status(400).json({
                success: false , 
                message: "There was no invitation"
            })
            return ; 
        }
        console.log("running");
        
        const user = await User.findById(userId); 
        if(!user){
            res.status(404).json({
                success: false, 
                message: "user does not exist"
            })
            return ;
        }

        const team = await Team.findById(teamId);
        if(!team){
            res.status(404).json({
                success: false, 
                message: "Team does not exist"
            })
            return ;
        }

        if (team.teamMembers.some(m => m.member.toString() === userId)) {
            return res.status(400).json({ 
                success: false,
                message: "User is already in the team!" 
            });
        }

        team.teamMembers.push({
            member: userId
        })

        await team.save(); 

        user.teams.push({
            teamId: team._id,
            isLeader: false, 
        })

        await user.save();


        res.status(200).json({
            success: true,
            message: "User added successully"
        })

    } catch (error) {
        console.log("error in backend ", error);
        
    }
};

export const rejectInvitation = async(req, res) => {
    const {userId, teamId } = req.body; 
    try {
        
        const notification = await Notification.findOneAndDelete({to: userId, from: teamId, isReq: true}); 

        if(!notification){
            res.status(400).json({
                success: false , 
                message: "There was no invitation"
            })
            return ; 
        }

        const user = await User.findById(userId); 
        if(!user){
            res.status(404).json({
                success: false, 
                message: "user does not exist"
            })
            return ;
        }

        const team = await Team.findById(teamId);
        if(!team){
            res.status(404).json({
                success: false, 
                message: "Team does not exist"
            })
            return ;
        }

        if (team.teamMembers.some(m => m.member.toString() === userId)) {
            return res.status(400).json({ 
                success: false,
                message: "User is already in the team!" 
            });
        }

        return res.status(200).json({
            success : true , 
            message : "User Rejected the invitation !"
        })
    }
    catch(error){
            console.log(error);
            
        }
}