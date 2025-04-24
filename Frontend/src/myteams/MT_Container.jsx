import React, { useState } from 'react'
import { formatTimeInChat } from '../Utils/date.js';
import { useChatStore } from '../store/chat.store.js';



const MT_Container = ({m , userId, ...handler}) => {

    // console.log(m);
    // console.log("Message in container : ", m.text)
    // console.log(m.createdAt) 

    const {teamMembers, leader} = useChatStore();

    let username = "" ; 

    // console.log("team members : ",teamMembers);
    // console.log("leader : ",leader); 

    // console.log("This is m : ",m);

    if(m.senderId == leader._id){
        username = leader.name ;
    }
    else if(m.senderId != userId){
        teamMembers.map(ele => {
            if(ele._id == m.senderId){ username = ele.name ; return; } 
        })
    }

  return (
          <>{ m.senderId != userId ? 
        (
        <div className='flex justify-start mb-2' {...handler}>
            <div className='w-10 h-10 md:w-16 flex justify-center items-startr'>
                <div className='rounded-full bg-white w-6 h-6 md:w-10 md:h-10'>
                    <img src="./Barbarian.png" alt="User" />
                </div>
            </div>
            <div className='max-w-44 md:max-w-sm bg-gradient-to-l from-gray-950 via-gray-800 to-purple-950 rounded-2xl rounded-tl-none py-2 px-4'>
            <h1 className='bg-gradient-to-r from-purple-500 via-cyan-500 to-violet-800 bg-clip-text text-transparent text-xs font-poppins font-medium'>
                    {`${username}`}
                </h1>
                <div className='font-poppins font-light text-xs md:text-base'>
                {m.image && (
                <img
                  src={m.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
                {`${m.text}`}
                </div>
                <div className='w-full text-xs text-gray-200'>
                {formatTimeInChat(m.createdAt)}
                </div>
            </div>
        </div>
        )
        :
        (<div className='flex justify-end mb-2' {...handler}>
        <div className='max-w-44 md:max-w-sm bg-gradient-to-l from-cyan-600 via-purple-700 to-fuchsia-800 rounded-2xl rounded-tr-none py-2 px-4 text-end'>
            <div className='font-poppins font-light text-xs md:text-base'>
            {m.image && (
                <img
                  src={m.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
            {`${m.text}`}
            </div>
            <div className='w-full text-xs text-gray-200'>
                {formatTimeInChat(m.createdAt)}
            </div>
        </div>
        <div className='w-10 h-10 md:w-16  flex justify-center items-start'>
            <div className='rounded-full bg-white w-6 h-6 md:w-10 md:h-10'>
                <img src="./Barbarian.png" alt="User" />
            </div>
        </div>
    </div>)
    }</>
  )
}

export default MT_Container