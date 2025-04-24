import React from 'react'
import HackathonCarousel from '../explore/HackathonCarousel'
import TeamCarousel from '../explore/TeamCarousel'
import UserCarousel from '../explore/UserCarousel'
import {motion} from 'framer-motion'
import ExploreFooter from '../explore/ExploreFooter'
import { Link } from 'react-router-dom'

const Explore = () => {

  return (
    <div className='bg-black w-full h-screen pt-16 '>

    <div className='w-full h-full overflow-y-scroll overflow-x-scroll custom-scrollbar'>

        <div className='bg-transparent mb-8'>
            <div className='font-poppins font-medium text-white px-10 flex justify-between'>
                <div>
                Hackathons
                </div>
                <div>
                    <motion.button 
                    className='hover:bg-gradient-to-r from-gray-300 via-purple-300 to-purple-700 hover:text-black px-4 rounded-lg transition duration-500'
                    >
                        <Link to={"/explore/all-hackathons"}>
                            View All
                        </Link>
                    </motion.button>
                </div>
            </div> 
            <div className='flex bg-transparent'>
                <HackathonCarousel />
            </div>
        </div>

        <div className='bg-transparent mb-8'>
            <div className='font-poppins font-medium text-white px-10 flex justify-between'>
                <div>
                Teams
                </div>
                <div>
                    <motion.button 
                    className='opacity-0 hover:bg-gradient-to-r from-gray-300 via-purple-300 to-purple-700 hover:text-black px-4 rounded-lg transition duration-500'
                    >
                        View All
                    </motion.button>
                </div>
            </div> 
            <div className='flex bg-transparent'>
                <TeamCarousel />
            </div>
        </div>

    

        <div className='bg-transparent mb-8'>
            <div className='font-poppins font-medium text-white px-10 flex justify-between'>
                <div>
                Users
                </div>
                <div>
                    <motion.button 
                    className='hover:bg-gradient-to-r from-gray-300 via-purple-300 to-purple-700 hover:text-black px-4 rounded-lg transition duration-500'
                    >
                        <Link to={"/explore/all-users"}>
                        View All
                        </Link>
                    </motion.button>
                </div>
            </div> 
            <div className='flex bg-transparent'>
                <UserCarousel />
            </div>
        </div>



        <div className='bg-violet-400 '>
            <ExploreFooter/>
        </div>
    </div>

    </div>
  )
}

export default Explore