import React, { useState, useRef, useEffect, act } from 'react'
import { Menu, ChevronUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false)

    const [active, setActive] = useState(1); 

    const navigate = useNavigate()

    const handleMenu = () =>{
        if(menuOpen) setMenuOpen(false); 
        else setMenuOpen(true); 
    }

    const handleNavbar = (n) => {
        if(active == n) return ;
        else {
            setActive(n); 
            if(n == 1) navigate('/');
            if(n == 2) navigate('/explore');
            if(n == 3) navigate('/myteams');
            if(n == 4) navigate('/lobby');
            if(n == 5) navigate('/profile');
        }
    }

    // console.log(active)


  return (
    <div className='fixed bg-gradient-to-t from-transparent via-black to-black flex justify-center h-16 w-full lg:px-2 sm:px-0 z-40'>
        <div className='bg-transparent rounded-lg mx-4 my-2 w-full flex justify-between items-center'> 
            <div className='max-w-20 w-full'>
                <img src="./Hack of Clans.png" alt="HOC" className='w-10 h-10'/>
            </div>
            <div className='justify-between items-center hidden md:flex text-white' >
                <motion.button
                key={1} 
                whileHover={{scale: 1.05, y:-1}}
                onClick={() => handleNavbar(1)}
                className={`px-4 hover:text-purple-500 ${active == 1 ? "text-purple-500" : "text-white"}`}>
                   <span className='hover:text-pink-600 transition duration-500'>H</span>
                   <span className='hover:text-pink-600 transition duration-500'>o</span>
                   <span className='hover:text-pink-600 transition duration-500'>m</span>
                   <span className='hover:text-pink-600 transition duration-500'>e</span>
                </motion.button>
                <motion.button 
                key={2} 
                whileHover={{scale: 1.05, y:-1}}
                onClick={() => handleNavbar(2)}
                className={`px-4 hover:text-purple-600 ${active == 2  ? "text-purple-600" : "text-white"}`}>
                   <span className='hover:text-pink-600 transition duration-500'>E</span>
                   <span className='hover:text-pink-600 transition duration-500'>x</span>
                   <span className='hover:text-pink-600 transition duration-500'>p</span>
                   <span className='hover:text-pink-600 transition duration-500'>l</span>
                   <span className='hover:text-pink-600 transition duration-500'>o</span>
                   <span className='hover:text-pink-600 transition duration-500'>r</span>
                   <span className='hover:text-pink-600 transition duration-500'>e</span>
                </motion.button>
                <motion.button
                key={3} 
                whileHover={{scale: 1.05, y:-1}}
                onClick={() => handleNavbar(3)}
                className={`px-4 hover:text-violet-600 ${active == 3 ? "text-purple-600" : "text-white"}`}>
                   <span className='hover:text-pink-600 transition duration-500'>M</span>
                   <span className='hover:text-pink-600 transition duration-500'>y</span>
                   <span className='hover:text-pink-600 transition duration-500'>T</span>
                   <span className='hover:text-pink-600 transition duration-500'>e</span>
                   <span className='hover:text-pink-600 transition duration-500'>a</span>
                   <span className='hover:text-pink-600 transition duration-500'>m</span>
                   <span className='hover:text-pink-600 transition duration-500'>s</span>
                </motion.button>
                <motion.button
                key={4} 
                whileHover={{scale: 1.05, y:-1}}
                onClick={() => handleNavbar(4)}
                className={`px-4 hover:text-pink-400 ${active == 4 ? "text-pink-400" : "text-white"}`}>
                   <span className='hover:text-purple-600 transition duration-500'>L</span>
                   <span className='hover:text-purple-600 transition duration-500'>o</span>
                   <span className='hover:text-purple-600 transition duration-500'>b</span>
                   <span className='hover:text-purple-600 transition duration-500'>b</span>
                   <span className='hover:text-purple-600 transition duration-500'>y</span>
                </motion.button>
                <motion.button 
                key={5} 
                whileHover={{scale: 1.05, y:-1}}
                onClick={() => handleNavbar(5)}
                className={`px-4 hover:text-pink-400 ${active == 5 ? "text-pink-400" : "text-white"}`}>
                   <span className='hover:text-purple-600 transition duration-500'>P</span>
                   <span className='hover:text-purple-600 transition duration-500'>r</span>
                   <span className='hover:text-purple-600 transition duration-500'>o</span>
                   <span className='hover:text-purple-600 transition duration-500'>f</span>
                   <span className='hover:text-purple-600 transition duration-500'>i</span>
                   <span className='hover:text-purple-600 transition duration-500'>l</span>
                   <span className='hover:text-purple-600 transition duration-500'>e</span>
                </motion.button>
            </div>
            <div>
                
                {menuOpen ? <></> :
                    <motion.button
                    initial = {{opacity: 0, y: 20}}
                    animate = {{opacity: 1, y: 0}}
                    whileHover={{scaleX:1.2}}
                    onClick={handleMenu}
                    >   
                        <Menu className='text-purple-300 size-5 mr-2 md:hidden'/> 
                    </motion.button> 
                }
                
            </div>
            {
                menuOpen ? <>
                <motion.div 
                initial = {{opacity: 0, y: -20}}
                animate = {{opacity: 1, y: 0}}
                className='absolute w-[200px] bg-black top-[10px] text-white rounded-lg right-0 z-40'>
                    <div className='flex justify-between'>
                        <div>
                                {/* empty */}
                        </div>
                        <div>
                        <motion.button
                            initial = {{opacity: 0, y: 20}}
                            animate = {{opacity: 1, y: 0}}
                            whileHover={{scaleX:1.2}}
                            onClick={handleMenu}
                        >
                            {menuOpen ? <ChevronUp className='text-purple-200 size-5 mr-2 mt-2'/> : <></>}
                        </motion.button>
                    </div>

                    </div>
                
                <div className='text-center mt-2 mb-2 text-purple-50'>
                    <motion.button 
                        onClick={() => handleNavbar(1)}
                    >
                        Home
                    </motion.button>
                </div>
                <div className='text-center mt-2 mb-2 text-purple-300'>
                    <motion.button 
                        onClick={() => handleNavbar(2)}
                    >
                        Explore
                    </motion.button>
                </div>
                <div className='text-center mt-2 mb-2 text-violet-400'>
                    <motion.button 
                        onClick={() => handleNavbar(3)}
                    >
                        MyTeams
                    </motion.button>
                </div>
                <div className='text-center mt-2 mb-2 text-purple-500'>
                    <motion.button 
                        onClick={() => handleNavbar(4)}
                    >
                        Lobby
                    </motion.button>
                </div>
                <div className='text-center mt-2 mb-2 text-purple-600'>
                    <motion.button 
                        onClick={() => handleNavbar(5)}
                    >
                        Profile
                    </motion.button>
                </div>
            </motion.div>
                </> : <></>
            }
            
        </div>
    </div>
  )
}

export default Navbar