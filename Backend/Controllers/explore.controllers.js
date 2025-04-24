import { Hackathon } from "../Models/hackathon.model.js"
import { Team } from "../Models/team.model.js";
import { User } from "../Models/user.model.js";


export const getHackathons = async(req, res) => {

    try {
        const top15teams = await Hackathon.find({}).sort({ score: -1 }).limit(15);

        res.status(200).json({
            top15teams
        })
    } catch (error) {
        
    }
}

export const get50hackathons = async(req, res) => {
    try {
        const more = parseInt(req.query.more) || 1;
        const limit = parseInt(req.query.limit) || 50;
    
        const skip = (more - 1) * limit;
    
        const hackathons = await Hackathon.find()
          .sort({ _id: 1 })
          .skip(skip)
          .limit(limit);
    
        const total = await Hackathon.countDocuments();
        const hasMore = skip + hackathons.length < total;
    
        res.json({ hackathons, hasMore });
    } catch (error) {
        console.log("error occured in get50hackathons ", error)
        res.status(500).json({message : "internal sever se error hai in get50hacktahons"});
    }
}

export const getUsers = async(req, res) => {
    try {
        const top15Users = await User.find({}).sort({ score: -1 }).limit(15);

        res.status(200).json({
            top15Users
        })
    } catch (error) {
        console.log(error)
    }
}

export const get50Users  = async(req, res) => {
    try {
        const more = parseInt(req.query.more) || 1;
        const limit = parseInt(req.query.limit) || 50;
    
        const skip = (more - 1) * limit;
    
        const users = await User.find()
          .sort({ _id: 1 })
          .skip(skip)
          .limit(limit);
    
        const total = await User.countDocuments();
        const hasMore = skip + users.length < total;
    
        res.json({ users, hasMore });
    } catch (error) {
        console.log("error occured in get50users ", error)
        res.status(500).json({message : "internal sever se error hai in get50hacktahons"});
    }
}

export const getTop15Teams = async (req, res) => {
    try {
        const teams = await Team.find({})
            .sort({ createdAt: -1 }) 
            .limit(15)
            .populate('leader', 'name profilPic skills')
            .populate({
                path: 'teamMembers.member',
                select: 'name profilPic skills',
                options: { limit: 2 } 
            });

        if (!teams || teams.length === 0) {
            return res.status(404).json({ message: 'No teams found' });
        }


        const processedTeams = teams.map(team => {

            const leaderData = {
                teamleader: team.leader._id,
                teamleaderName: team.leader.name,
                teamleaderTop3Skills: team.leader.skills.slice(0, 3).map(skill => ({
                    skillname: skill.skillname,
                    level: skill.level
                })),
                teamleaderProfilepic: team.leader.profilPic
            };

            const topMembersData = team.teamMembers.slice(0, 2).map(member => ({
                memberId: member.member._id,
                memberName: member.member.name,
                memberTop3Skills: member.member.skills.slice(0, 3).map(skill => ({
                    skillname: skill.skillname,
                    level: skill.level
                })),
                memberProfilepic: member.member.profilPic
            }));

            return {
                teamId: team._id,
                teamname: team.teamName,
                teamlogo: team.logo,
                description: team.description,
                hackathon: team.hackathon, 
                ...leaderData,
                top2TeamMembers: topMembersData,
                totalTeamMembers: team.teamMembers.length + 1 
            };
        });

        res.status(200).json({
            success: true,
            count: processedTeams.length,
            top15Teams: processedTeams
        });
    } catch (error) {
        console.error('Error fetching top teams:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal server error' 
        });
    }
};