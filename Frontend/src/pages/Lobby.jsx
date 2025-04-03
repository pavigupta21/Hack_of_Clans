import React from 'react'
import TeamChatList from '../components/TeamChatList'
import Chatbox from '../components/Chatbox'
import { useClanStore } from '../store/clan.store'

const Lobby = () => {



  return (
<div className='bg-black w-full h-screen'>
    <div className='flex flex-col md:flex-row lg:flex-row justify-center pt-16'>
        <div className='md:w-2/6 p-4 md:h-[90vh]'>
            <TeamChatList/>
        </div>
        <div className='md:w-4/6 px-4'>
            <Chatbox/> 
        </div>
    </div>
</div>
  )
}

export default Lobby