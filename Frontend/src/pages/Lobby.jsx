import React, { useEffect, useState } from 'react';
import TeamChatList from '../components/TeamChatList';
import Chatbox from '../components/Chatbox';
import { useChatStore } from '../store/chat.store';
import Lottie from 'lottie-react';
import animationData from "../assets/Chat.json"
import BgAnim from '../myteams/BgAnim';

const Lobby = () => {
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
    <div className="bg-transparent w-full h-screen z-0">
      <div className='fixed inset-0 top-0 bottom-0 -z-10'>
        <BgAnim/>
      </div>
      {isMobile ? (
        <div className="flex flex-col pt-16 z-30">
          {
            isChatting == 1 ? 
              <Chatbox onClick = {() => setIsChatting(0)}/> 
              : 
              <TeamChatList setIsChatting={setIsChatting} isMobile = {isMobile}/>
          }
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center pt-16 z-30">
          <div className="md:w-2/6 p-4 md:h-[90vh]">
            <TeamChatList />
          </div>
          <div className="md:w-4/6 px-4">
          {
            selectedTeam == "" ? 
              <div className='font-poppins text-center text-gray-300 w-full h-full flex items-center justify-center z-10'>
                <div className='flex flex-col items-center justify-center'>
                  {/* <img src="./Please_Select_A_Chat.gif" alt="gif" className='w-48 mb-4'/> */}
                  <Lottie animationData={animationData} className='w-48'/>
                  <h2>Please select a chat</h2> 
                </div>
              </div> 
              :  
              <Chatbox /> 
          }
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Lobby;
