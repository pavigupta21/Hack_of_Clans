import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { useChatStore } from '../store/chat.store'

const Headers = ({teamName, ...handlers}) => { 

    const {selectedTeamDet, activeTeamDetails} = useChatStore(); 

    console.log(activeTeamDetails?.logo, " sD");
    
    
  return (
    <div className='w-full h-[10vh] bg-transparent backdrop-blur-2xl flex'>
        <div className='px-8 flex items-center'>

        <div>
            <button className='md:hidden text-purple-400' {...handlers}>
                <ChevronLeft className='size-5'/>
            </button>
        </div>

            <div className='w-12 h-12 md:w-16 md:h-16 bg-transparent rounded-full border-2 border-fuchsia-700 flex justify-center items-center'>
                <img src={ activeTeamDetails?.logo ||"./icons8-team-48.png"} alt="Team Image" className='object-cover rounded-full' />
            </div>
        </div>
        <div className='w-full h-[10vh] flex items-center justify-start pl-10'>
            <div className='text-white font-poppins font-medium text-lg md:text-xl'>
                {`${teamName}`}
            </div>
        </div>
    </div>
  )
}


export default Headers