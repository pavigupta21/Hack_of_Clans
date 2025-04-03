import React, { useEffect } from 'react'
import Headers from './Headers'
import ChatContainer from './ChatContainer'
import MessageInput from './MessageInuput'
import { useChatStore } from '../store/chat.store.js'
import { useClanStore } from '../store/clan.store.js'

const Chatbox = () => {

  const {selectedTeam, fetchActiveTeam, teamMessages, selectedTeamName} = useChatStore(); 
  const {user} = useClanStore(); 

  const userId = user._id; 

  useEffect(() => {
    fetchActiveTeam({selectedTeam, userId})
  },[userId, selectedTeam])
  
  // console.log( "These are team messages : ", teamMessages);
  // console.log("user: ", user._id)
  console.log("Team messages: ", teamMessages);
  

  return (
    <div className='w-full h-full bg-black text-white'>
        <div className='w-full h-[10vh] '>
            <Headers teamName={selectedTeamName}/>
        </div>
        <div className='w-full h-[70vh] overflow-y-scroll custom-scrollbar'>
            {teamMessages.map(m => {
              console.log("Message text :",m.text);
              const text = m.text ;
              return <ChatContainer m ={m} userId = {userId}/>
            })}
        </div>
        <div className='w-full h-[10vh] '>
            <MessageInput/>
        </div>
    </div>
  )
}

export default Chatbox