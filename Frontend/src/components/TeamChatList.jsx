import React, { useEffect } from 'react';
import Team from './Team';
import { useClanStore } from '../store/clan.store';
import { useChatStore } from '../store/chat.store';
import { motion } from 'framer-motion';
import animationData from '../assets/Search_Chat.json';
import Lottie from "lottie-react";

const TeamChatList = ({ isMobile, setIsChatting }) => {
  const { user, getUserTeams, userTeams } = useClanStore(); 
  const { selectedTeam, setSelectedTeam , fetchActiveTeam} = useChatStore();  

  useEffect(() => {
    if (user?._id) {
      getUserTeams(user._id); 
    }
  }, [user._id]);

    useEffect(() => {
      fetchActiveTeam(selectedTeam, user._id); 
      // console.log("active team : ", activeTeamDetails);
      
    },[selectedTeam, setSelectedTeam])

  return (
    <div className='backdrop-blur-sm h-full overflow-y-scroll custom-scrollbar'>
      {Array.isArray(userTeams) && userTeams.length > 0 ? (
        userTeams.map((team, index) => (
          <div className='w-full'>
          <motion.button
            key={index}
            onClick={() => {
              setSelectedTeam(team._id);
              if (isMobile) setIsChatting(1);
            }}
            className='w-5/6'
            >
            <Team
              teamName={team.teamName}
              teamId={team._id}
              selectedTeamId={selectedTeam}
              logo={team.logo}
              />
          </motion.button>
          </div>
        ))
      ) : (
        <div className='flex flex-col items-center h-full'>
          <Lottie animationData={animationData} loop={true} className="max-w-sm w-full h-64" />
          <p className="text-gray-500 text-center mt-4">No teams found</p>
        </div>
      )}
    </div>
  );
};

export default TeamChatList;
