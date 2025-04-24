import React, { useState } from 'react'

const Team = ({teamName, teamId, selectedTeamId, logo}) => { 

    const isActive = teamId == selectedTeamId ? 1 : 0 ;

  return (
    <div className='relative bg-transparent backdrop-blur-3xl opacity-90 w-full md:h-[10vh] rounded-lg mb-4 px-0.5 hover:border-2 border-pink-600 transition hover:border-y-purple-800 transtion duration-700'>
        <div className='fixed top-0 right-0 w-full h-full z-0 bg-gray-950 opacity-80 rounded-lg'>

        </div>
        
        <div className='bg-transparent backdrop-blur-3xl w-full h-full rounded-lg flex pl-2 items-center'>
            
            <div className='w-12 h-12 md:w-16 md:h-16 bg-transparent rounded-full m-1 items-center flex justify-center border-x-2  border-fuchsia-800 hover:border-y-2 transition hover:border-y-purple-800 transtion duration-700'>
                <img src={logo || "./icons8-team-48.png"} alt="Team Image" className='object-cover rounded-full' />
            </div>
            
            <div className='w-5/6 h-full mx-2 mt-6'>
                <div className='text-start text-white text-md font-poppins'>
                    {`${teamName}`}
                </div>
                {/* <div className={`${!isActive ? "text-start text-gray-400 text-sm font-poppins": "text-start text-white text-sm font-poppins"}`}>
                    Member : Hello !! This is a sample message.
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default Team