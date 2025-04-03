import React, { useEffect, useState } from 'react'
import Team from './Team'
import { useClanStore } from '../store/clan.store';
import { useChatStore } from '../store/chat.store';
import {motion} from 'framer-motion';

const TeamChatList = () => {
  const { user, getUserTeams, userTeams } = useClanStore(); 

  const {selectedTeam, setSelectedTeam} = useChatStore();  

  const [activeTeam, setActiveTeam] = useState(selectedTeam); 

  useEffect(() => {
    if (user?._id) {
      getUserTeams(user._id); 
    }
  }, [user._id]);

  // console.log("User teams:", userTeams);
  // console.log("Is userTeams an array?", Array.isArray(userTeams));

  useEffect(() => {
    setSelectedTeam(activeTeam); 
  }, [activeTeam, setSelectedTeam]);

  return (
    <>
      {Array.isArray(userTeams) && userTeams.length > 0 ? (
        userTeams.map((team, index) => (
          <motion.button 
            onClick={() => setActiveTeam(team._id)}
          >
          <Team teamName={team.teamName} teamId={team._id} selectedTeamId={activeTeam}/>
          </motion.button>
        ))
      ) : (
        <p className="text-gray-500 text-center">No teams found</p>
      )}
    </>
  );
};

export default TeamChatList;