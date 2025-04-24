import React, { useEffect, useRef, useState } from 'react'
import { motion} from 'framer-motion'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useTeamStore } from '../store/team.store';
import { useClanStore } from '../store/clan.store';
import toast from 'react-hot-toast';

const TeamCard = ({ele}) => {

  const [hovered, setHovered] = useState(false);
  const { sendRequest } = useTeamStore();
  const { user } = useClanStore();
  const lineRef = useRef(null)

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  useEffect(() => {
    if (hovered) {
      gsap.to(lineRef.current, {
        width: "100%", // or some value like "200px"
        duration: 0.6,
        ease: "linear",
      });
    } else {
      gsap.to(lineRef.current, {
        width: "0%",
        duration: 0.6,
        ease: "linear",
      });
    }
  }, [hovered]);

  console.log("ele in teamcard", ele);
  

  const handleReq = async() => {
      await sendRequest(user._id, ele.teamId);
      toast.success("Request sent successfully !!")
  }

  return (
    <motion.div 
    onMouseEnter={handleMouseOver}
    onMouseLeave={handleMouseLeave}
    className={`relative w-[300px] h-[400px] overflow-hidden rounded-xl m-4 flex-shrink-0 ${hovered ? "bg-gradient-to-tr from-black via-gray-950 to-cyan-700 border-cyan-300" : "bg-gradient-to-bl from-black via-gray-950 to-purple-800 border-purple-900"} transition duration-700 border  z-10`}>

    <div className='overflow-hidden w-full h-[400px] absolute'>

      <motion.div
        initial={{ x: -20, y: -10, rotate: 90}}
        animate={
          hovered
          ? { x: -20, y: 80, rotate: 90 }
          : { x: -20, y: -10, rotate: 90 }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`bg-white opacity-15 rounded-full w-[250px] h-[40px] transition ease-linear`}
        />


      <motion.div
        initial={{ x: 90, y: -100, rotate: 90}}
        animate={
          hovered
          ? { x: 90, y: -10, rotate: 90 }
          : { x: 90, y: -100, rotate: 90 }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white opacity-15 rounded-full w-[250px] h-[40px]"
        />

      <motion.div
        initial={{ x: -40, y: 290, rotate: 90}}
        animate={
          hovered
          ? { x: -40, y: 140, rotate: 90 }
          : { x: -40, y: 290, rotate: 90 }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white opacity-15 rounded-full w-[400px] h-[40px]"
        />

      <motion.div
        initial={{ x: -10, y: 290, rotate: 90}}
        animate={
          hovered
          ? { x: 50, y: 290, rotate: 90 }
          : { x: 50, y: 320, rotate: 90 }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white opacity-15 rounded-full w-[400px] h-[40px]"
        />

      <motion.div
        initial={{ x: -10, y: 290, rotate: 90}}
        animate={
          hovered
          ? { x: -150, y: 320, rotate: 90 }
          : { x: -150, y: 370, rotate: 90 }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white opacity-15 rounded-full w-[400px] h-[40px]"
        />
   
    </div>

      <motion.div 
      className='flex mt-4'>
        <div>
          <img src={ele.teamlogo ||  "./TeamDefault1.png"} alt="logo" className='w-24 h-24 mt-4 ml-4 m-2 p-4 rounded-full '/>
        </div>
        <div className='w-40 flex-col text-center pt-7 justify-center'>
          <h2 className='font-black-ops font-medium text-gray-300 text-lg'>
          {ele.teamname}
          </h2>
          <h4 className='font-poppins font-medium text-sm text-gray-400'>
            {ele.hackathon}
          </h4>
        </div>
      </motion.div>

      <motion.div 
        animate = {hovered ? {opacity: 0} : {opacity: 100}}
        transition={{duration: 0.2, ease:"linear"}}
        className=''>
        <span className='font-poppins font-medium text-sm pl-4 text-gray-300' >
        Team bio:
        </span>
        <p className='px-4 text-center text-gray-300 text-sm font-poppins'>
        {ele.description || "The team has no description ... "}
        </p>
        
      </motion.div>

      <motion.div 
        animate = {hovered ? {opacity: 0} : {opacity: 100}}
        transition={{duration: 0.2, ease:"linear"}}
        className='absolute bottom-5 w-full flex justify-evenly pt-2 text-gray-300 mt-3'>
        <div className='font-poppins font-medium text-xs flex flex-col items-center justify-center'>
        {ele.top2TeamMembers[0] ? <img src={ele.top2TeamMembers[0]?.memberProfilepic || "./member1.jpg"} alt="user" className='w-12 h-12 rounded-full mt-3' /> : <></>}
          <h4>
          {ele.top2TeamMembers[0]?.memberName}
          </h4>
          <h6 className='text-center text-xs'>{ele.top2TeamMembers[0]?.memberTop3Skills?.[0]?.skillname}</h6>
          <h6 className='text-center text-xs'>{ele.top2TeamMembers[0]?.memberTop3Skills?.[1]?.skillname}</h6>
          <h6 className='text-center text-xs'>{ele.top2TeamMembers[0]?.memberTop3Skills?.[2]?.skillname}</h6>
        </div>
        <div className='font-poppins font-medium text-sm flex flex-col justify-center items-center text-center'>

          <img src={ele.teamleaderProfilepic ||  "./spiderman.jpg"} alt="user" className='w-14 h-14 rounded-full text-center'/>
          <h4>
          {ele.teamleaderName}
          </h4>
          <h6 className='text-center text-xs'>{ele.teamleaderTop3Skills[0]?.skillname || ""}</h6>
          <h6 className='text-center text-xs'>{ele.teamleaderTop3Skills[1]?.skillname || ""}</h6>
          <h6 className='text-center text-xs'>{ele.teamleaderTop3Skills[2]?.skillname || ""}</h6>
        </div>
        <div className='font-poppins font-medium text-xs flex flex-col items-center justify-center'>
          {ele.top2TeamMembers[1] ? <img src={ele.top2TeamMembers[1]?.memberProfilepic || "./member1.jpg"} alt="user" className='w-12 h-12 rounded-full mt-3' /> : <></>}
          <h4>
          {ele.top2TeamMembers[1]?.memberName}
          </h4>
          <h6 className='text-center text-xs'>{ele.top2TeamMembers[1]?.memberTop3Skills?.[0]?.skillname}</h6>
          <h6 className='text-center text-xs'>{ele.top2TeamMembers[1]?.memberTop3Skills?.[1]?.skillname}</h6>
          <h6 className='text-center text-xs'>{ele.top2TeamMembers[1]?.memberTop3Skills?.[2]?.skillname}</h6>
        </div>
      </motion.div>

      <motion.div 
        initial={{ x: 300, y: -240}}
        animate={
          hovered
          ? { x: 90, y: -240}
          : { x: 300, y: -240 }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute -bottom-32 bg-zinc-900 opacity-75 rounded-2xl w-[200px] h-[180px]">
        <div className='text-white text-center pt-5 font-poppins font-medium'>
          Hey There !! 
        </div>
        <div className='font-poppins font-medium text-sm p-2 text-white'>
          We are currently looking for people with great backend skill mostly node and express 
        </div>
        <div className='font-poppins font-medium text-sm p-2 text-white'>
            total members : {ele.totalTeamMembers}
        </div>
      </motion.div>

      <motion.button
        initial={{ x: 40, y: -200}}
        animate={
          hovered
          ? { x: 40, y: -200}
          : { x: 40, y: -120 }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="opacity-0 absolute -bottom-44 bg-zinc-900 rounded-2xl w-[80px] h-[40px] text-white hover:bg-gradient-to-tr from-purple-800 via-fuchsia-800-800 to-black">
          View
      </motion.button>

      <motion.button
        initial={{ x: 90, y: -200}}
        animate={
          hovered
          ? { x: 90, y: -200}
          : { x: 90, y: -120 }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={() => handleReq()}
        className="absolute -bottom-44 right-32 bg-zinc-900 rounded-2xl w-[80px] h-[40px] text-white hover:bg-gradient-to-tr from-purple-800 via-fuchsia-800-800 to-black">
          Request
      </motion.button>
      
    </motion.div>
  )
}

export default TeamCard