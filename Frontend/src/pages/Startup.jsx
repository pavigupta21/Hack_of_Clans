import React, { useState } from 'react'
import { useClanStore } from '../store/clan.store'
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Input from '../components/Input';
import { ShieldUser } from 'lucide-react';
import { StartupInput } from '../components/Input';
import AccountSetUp from '../components/AccountSetUp';
import Warriors from '../components/Warriors';

const Startup = () => {


    const [password, setPassword ]  = useState("");

    const { user, skills, personal_Info, personal_links, startupSubmit } = useClanStore();

    useGSAP(()=>{
        gsap.from(".anim-line", {
            scaleX: 0,
            duration: 2,
        })
    })

    const handleSubmit = async() => {
        console.log(password);
        await startupSubmit(user, skills, personal_Info, personal_links, password);
    }

  return (
    <div>
        <div className='fixed top-0 left-0 w-full h-screen bg-transparent flex justify-center items-center z-10'>
            <div className='max-w-3xl w-full text-center bg-gray-900 rounded-xl backdrop-blur-lg'>
                <h1 className='bg-gradient-to-r from-purple-500 via-cyan-500 to-violet-800 bg-clip-text text-transparent text-2xl font-mono font-extrabold mt-4'>
                    Welcome to HACK OF CLANS ! {user.name}
                </h1>

            <div className='flex justify-center mb-2 mt-1'>
                <div
                    className='anim-line max-w-xl w-full h-0.5 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500'>

                </div>
            </div> 
            {  user.googleUser && 
                <div className='w-full flex justify-center '>
                    <div className='mt-2'>
                    <StartupInput onChange = {(e) => setPassword(e.target.value)}/>    
                    </div>
                </div>
            }

            <div className='mt-2'>
                <h2 className='bg-gradient-to-r from-purple-500 via-pink-500 to-violet-800 bg-clip-text text-transparent text-xl font-mono font-semibold'>Setup your account</h2>
                <AccountSetUp/>
            </div>
                <motion.button 
                whileHover={{scaleX:1.05}}
                whileTap={{scaleX:0.9}}
                onClick={handleSubmit}
                className='max-w-xs w-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white font-mono font-bold m-2'>
                    Sumbit
                </motion.button>
            </div>

            <div>
            </div>
        </div>
        <div
            className='lg:fixed lg:w-screen lg:h-screen lg:top-0 lg:left-0 lg:z-0'
        >
            <Warriors/>
        </div>
    </div>
  )
}

export default Startup