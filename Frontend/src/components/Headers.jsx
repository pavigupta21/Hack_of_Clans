import React from 'react'

const Headers = ({teamName}) => {
  return (
    <div className='w-full h-[10vh] bg-black flex'>
        <div className='px-8 flex items-center'>
            <div className='w-12 h-12 md:w-16 md:h-16 bg-transparent rounded-full border-2 border-fuchsia-700 flex justify-center items-center'>
                <img src="./icons8-team-48.png" alt="Team Image" />
            </div>
        </div>
        <div className='w-full h-[10vh] flex items-center justify-start pl-10'>
            <div className='text-white font-poppins font-medium text-xl'>
                {`${teamName}`}
            </div>
        </div>
    </div>
  )
}


export default Headers