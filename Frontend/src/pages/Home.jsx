import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useClanStore } from '../store/clan.store';
import Startup from './Startup.jsx';
import gsap from 'gsap';
import BgAnim from '../myteams/BgAnim.jsx';

const Home = () => {
    const { user, logout } = useClanStore();
    const cursorRef = useRef(null);

    return (
        <>
            <div className='relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden'>
                <div className='absolute right-[10%] top-1/2 -translate-y-1/2 z-0 opacity-70 rounded-lg'>
                    <img 
                        src="./clash royale wallpaper 172.jpg" 
                        alt="BG_IMAGE" 
                        className='w-44 md:w-80 object-contain rounded-lg border border-orange-800' 
                    />
                </div>
                <div className='font-black-ops text-3xl md:text-9xl bg-transparent relative z-10'>
                    <div className='bg-gradient-to-br from-pink-700 via-cyan-700 to-purple-700 bg-clip-text text-transparent'>
                          Hack Of Clans
                    </div>
                </div>
                <div className='font-black-ops md:text-2xl max-w-4xl w-full mt-6 bg-transparent relative z-10'>
                    <span className='bg-gradient-to-br from-pink-200 via-pink-200 to-purple-200 bg-clip-text text-transparent'>
                        Discover every hackathon under one roof! Dive into the ultimate hackathon hub—your gateway to coding challenges, networking, and innovation. Never miss an opportunity; ignite your creativity and compete globally today!
                    </span>
                </div>
            </div>
            
            {user.newUser && <Startup />}
        </>
    );
};

export default Home;
