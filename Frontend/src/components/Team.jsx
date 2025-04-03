import React, { useState } from 'react'

const Team = ({teamName, teamId, selectedTeamId}) => { 

    const isActive = teamId == selectedTeamId ? 1 : 0 ;

  return (
    <div className='bg-gradient-to-r from-purple-700 via-pink-800 to-fuchsia-800 w-full md:h-[10vh] rounded-lg mb-4 px-0.5 hover:border-2 border-pink-600 transition hover:border-y-purple-800 transtion duration-700'>
        <div className='bg-black w-full h-full rounded-lg flex pl-2 items-center'>
            
            <div className='w-12 h-12 md:w-16 md:h-16 bg-transparent rounded-full m-1 items-center flex justify-center border-x-2 p-2 border-fuchsia-800 hover:border-y-2 transition hover:border-y-purple-800 transtion duration-700'>
                <img src="./icons8-team-48.png" alt="Team Image" />
            </div>
            
            <div className='w-5/6 h-full mx-2 mt-6'>
                <div className='text-start text-white text-md font-poppins'>
                    {`${teamName}`}
                </div>
                <div className={`${!isActive ? "text-start text-gray-400 text-sm font-poppins": "text-start text-white text-sm font-poppins"}`}>
                    Member : Hello !! This is a sample message.
                </div>
            </div>
        </div>
    </div>
  )
}

export default Team