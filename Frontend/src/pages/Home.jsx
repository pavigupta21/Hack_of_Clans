import React from 'react'
import {motion} from 'framer-motion'; 
import {formatDate} from '../Utils/date.js'
import { useClanStore } from '../store/clan.store';
import Startup from './Startup.jsx';

const Home = () => {
    const {user, logout} = useClanStore(); 
    console.log(user.lastLogin)

    const handleLogout = () => {
        logout();
    }
  return ( <>
        <div className='w-full h-screen bg-black'>

        </div>
    { user.newUser && <Startup/>}
    </>
  )
}

export default Home