import React, { useEffect , useRef} from 'react'
import Headers from './Headers'
import ChatContainer from './ChatContainer'
import MessageInput from './MessageInuput'
import { useChatStore } from '../store/chat.store.js'
import { useClanStore } from '../store/clan.store.js'

const Chatbox = ({...handlers}) => {

  const {selectedTeam, fetchActiveTeam, teamMessages, selectedTeamName} = useChatStore(); 
  const {user} = useClanStore(); 
  const messageEndRef = useRef(null);
  const userId = user._id; 

  useEffect(() => {
    fetchActiveTeam({selectedTeam, userId})
  },[userId, selectedTeam])

  useEffect(() => {
    if (messageEndRef.current && teamMessages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // console.log(teamMessages);
  }, [teamMessages]);

  useEffect(() => {
    useChatStore.getState().getLatestMessages();
  }, [selectedTeam]);
  
  
  // console.log( "These are team messages : ", teamMessages);
  // console.log("user: ", user._id)
  // console.log("Team messages: ", teamMessages);
  console.log("sekect team : " , selectedTeam);
  

  return (
    <div className='w-full h-full bg-transparent backdrop-blur-xl text-white'>
        <div className='w-full h-[10vh] '>
            <Headers teamName={selectedTeamName} logo={selectedTeam.logo} {...handlers}/>
        </div>
        <div className='w-full h-[70vh] overflow-y-scroll custom-scrollbar'>
            {teamMessages.map(m => {
              console.log("Message text :",m.text);
              const text = m.text ;
              return <ChatContainer m ={m} userId = {userId} ref = {messageEndRef}/>
            })}
        </div>
        <div className='w-full h-[10vh] '>
            <MessageInput/>
        </div>
    </div>
  )
}

export default Chatbox