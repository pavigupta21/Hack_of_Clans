import React, { useEffect, useState } from 'react'
import BgAnim from './BgAnim'
import { useChatStore } from '../store/chat.store';
import TeamChatList from '../components/TeamChatList';
import Chatbox from '../components/Chatbox';
import Lottie from 'lottie-react';
import animationData from "../assets/Chat.json"
import TeamDetails from './TeamDetails';
import MyTeamsList from './MyTeamsList';

const MyTeams = () => {

      const [isMobile, setIsMobile] = useState(window.innerWidth < 768 ? 1 : 0);
      const [isChatting, setIsChatting] = useState(0);
      const {selectedTeam} = useChatStore();
    
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
  return (
    <div className='relative min-h-screen bg-black overflow-hidden'>

      <div className='absolute inset-0 z-0'>
        <BgAnim/>
      </div>
      
      <div className='relative z-10 h-[100vh]'>
      {isMobile ? (
        <div className="flex flex-col pt-16 h-full">
          {
            isChatting == 1 ? 
              <TeamDetails onClick = {() => setIsChatting(0)}/> 
              : 
              <MyTeamsList setIsChatting={setIsChatting} isMobile = {isMobile}/>
          }
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center pt-16 h-full">
          <div className="flex flex-row md:w-2/6 p-4 md:h-[90vh] h-full">
            <MyTeamsList />
          </div>
          <div className="md:w-5/6 px-4">
          {
            selectedTeam == "" ? 
              <div className='font-poppins text-center text-gray-300 w-full h-full flex items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                  <Lottie animationData={animationData} className='w-60'/>
                  <h2>Please select a Team</h2> 
                </div>
              </div> 
              :  
              <TeamDetails /> 
          }
           
          </div>
        </div>
      )}

      </div>
    </div>
  )
}

export default MyTeams