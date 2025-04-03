import { Notification } from '../Models/notification.model.js';
import { Team } from '../Models/team.model.js'
import { User } from '../Models/user.model.js'

export const createTeam = async (req, res) => {
    const {teamName, hackathon, userId} = req.body;

    try {
        if(!teamName || !hackathon){
            res.status(400).json({
                success: false, 
                message: "Team name and hackathon names are required !"
            })
            return ; 
        }

        const leader = userId
        
        const team = new Team({
            teamName, 
            hackathon,
            leader,
            teamMembers: []
        })

        const user = await User.findById(userId); 
        if(!user){
            res.status(404).json({
                success: false, 
                message: "user does not exist"
            })
            return ;
        }

        await team.save();

        user.teams.push({
                teamId: team._id,
                isLeader: true, 
        })

        await user.save();

        res.status(201).json({
            team
        })

    } catch (error) {
        console.log("Error in create team : ", error)
        res.status(500).json({
            success:false, 
            message: "Internal sever error aya hai create team mein !!!"
        })
    }

}; 

export const joinTeamsReq = async (req, res) => {
    const {teamId, userId, usermessage} = req.body; 

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
            to: teamId, from: userId, isReq: true
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
            heading: "Team Join request!",
            content: usermessage,
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

        const nofify = new Notification({
            to: userId, 
            from: teamId, 
            heading: "Welcome!!",
            content: "Team member added",
            isReq: false
        })
        
        await nofify.save();

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

export const removeFromTeam = () => {
    //Future implementation : )) 
}; 

export const sendInvitiation = () => {
    //Future implementation : ))
}; 

export const acceptInvitation = () => {
    //Future implementation : ))
}

export const leaveTeam = () => {
    //Future implementation : )) 
}; 

export const giveDesignation = () => {
    //Future implementation : ))
}; 

export const assignTask = () => {
    //Future implementation : )) 

}; 

export const progressReport = () => {
    //Future implementation : )) 
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



