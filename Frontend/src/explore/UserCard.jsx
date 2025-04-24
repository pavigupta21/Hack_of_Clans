import React, { useEffect, useRef, useState } from 'react'
import { motion} from 'framer-motion'
import gsap from 'gsap';
import { useClanStore } from '../store/clan.store';
import { useChatStore } from '../store/chat.store';
import toast from 'react-hot-toast';
import { useTeamStore } from '../store/team.store';


const UserCard = ({ele}) => {

  const [hovered, setHovered] = useState(false);
  const {user} = useClanStore();
  const {activeTeamDetails} = useChatStore();
  const {inviteMember} = useTeamStore();

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

  const handleInvitation = async() => {
    console.log(user._id);
    console.log(activeTeamDetails);

    if(!activeTeamDetails){
      toast.error("Please select a team from MyTeams page : ) ")
      return;
    }
    
    if(user._id != activeTeamDetails.leader){
      toast.error("Please select a team from MyTeams where you are a leader")
      return;
    }

    console.log("usercard user is : " , ele);
    
    
    console.log(ele._id, activeTeamDetails._id);
    
    await inviteMember({userId: ele._id, teamId:activeTeamDetails._id})

    toast.success("Invitation sent successfully ")
  }


  return (
    <motion.div 
    onMouseEnter={handleMouseOver}
    onMouseLeave={handleMouseLeave}
    className={`relative w-[300px] h-[400px] overflow-hidden rounded-xl m-4 flex-shrink-0 ${!hovered ? "bg-gradient-to-tr from-black via-gray-950 to-purple-900 border-purple-900" : "bg-gradient-to-bl from-black via-gray-950 to-cyan-500 border-cyan-300"} transition duration-700 border  z-10`}>

    <div className='overflow-hidden w-full h-[400px] absolute'>

      <motion.div
        initial={{ x: -20, y: -10, rotate:180}}
        animate={
          hovered
          ? { x: -20, y: 55 , rotate: 180}
          : { x: -20, y: -120, rotate: 180 }
        }
        transition={{ duration: 0.6, ease: "linear" }}
        className="bg-transparent opacity-20 rounded-full w-fit"
        >
          <img src={"./Triangle.png" || "../public/Triangle.png"} alt="triangle"className='w-36' />
        </motion.div>
        
      <motion.div
        initial={{ x: -20, y: -10, rotate:180}}
        animate={
          hovered
          ? { x: 125, y: -80 , rotate: 180}
          : { x: 125, y: -270, rotate: 180 }
        }
        transition={{ duration: 0.4, ease: "linear" }}
        className="bg-transparent opacity-20 rounded-full w-fit"
        >
          <img src={"./Triangle.png" || "../public/Triangle.png"} alt="triangle"className='w-36' />
        </motion.div>

      <motion.div
        initial={{ x: 40, y: -10}}
        animate={
          hovered
          ? { x: 40, y: -155 }
          : { x: 40, y: 180 }
        }
        transition={{ duration: 0.4, ease: "linear" }}
        className="bg-transparent opacity-20 rounded-full w-fit"
        >
          <img src={"./Triangle.png" || "../public/Triangle.png"}  alt="triangle"className='w-40' />
        </motion.div>


      <motion.div
        initial={{ x: 40, y: -10}}
        animate={
          hovered
          ? { x: -10, y: -235 }
          : { x: -60, y: -235 }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-transparent opacity-20 rounded-full w-fit"
        >
          <img src={"./Triangle.png" || "../public/Triangle.png"} alt="triangle"className='w-14' />
        </motion.div>


      <motion.div
        initial={{ x: 0, y: 10, rotate:180}}
        animate={
          hovered
          ? { x: 0, y:-190, rotate:180 }
          : { x: -250, y: -190 , rotate:180}
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-transparent opacity-20 rounded-full w-fit bg-red-600"
        >
          <img src={"./Triangle.png" || "../public/Triangle.png"} alt="triangle"className='w-42' />
        </motion.div>


   
    </div>

      <motion.div 
      className='flex mt-4'>
        <div>
          <img src={ele.profilPic || "./Barbarian.png"} alt="logo" className='w-24 h-24 mt-4 ml-4 mb-2 p-4 rounded-full '/>
        </div>
        <div className='w-40 flex-col text-center pt-7 justify-center'>
          <h2 className='font-black-ops font-medium text-gray-300 text-lg'>
          {ele.name}
          </h2>
          <h4 className='font-poppins font-medium text-sm text-gray-400'>
            {ele.skills[0].skillname}
          </h4>
        </div>
      </motion.div>

      <motion.div 
        animate = {hovered ? {opacity: 0} : {opacity: 100}}
        transition={{duration: 0.2, ease:"linear"}}
        className=''>
        <span className='font-poppins font-medium text-sm pl-4 text-gray-300' >
        User bio:
        </span>
        <p className='px-4 text-center text-gray-300 text-sm font-poppins'>
        {ele.personal_info.bio || "Hey I am a HOC user"}
        </p>
        
      </motion.div>

      <motion.div 
        animate = {hovered ? {opacity: 0} : {opacity: 100}}
        transition={{duration: 0.2, ease:"linear"}}
        className=' flex justify-evenly pt-2 text-gray-300 mt-3'>
        <div className='font-poppins font-medium text-sm flex-col'>
          <div className='flex justify-center'>
          <h4>
          Skills 
          </h4>
          </div>
        <div className='flex p-1'>
          <div className='flex flex-wrap'>
          {
            ele.skills.slice(0,5).map((skill, i) => (
              <div key={i} className={`text-white h-fit w-fit font-poppins font-medium text-xs p-2 border rounded-3xl border-violet-600 m-1`}>  
                {skill.skillname}
              </div>
          ))
        }
            </div>
          </div>
        </div>

      </motion.div>

      <div className='absolute overflow-hidden z-30 w-[300px] h-[400px] bottom-0'>

        <motion.div 
          initial={{ x: 300, y: -240}}
          animate={
            hovered
            ? { x: 90, y: 120}
            : { x: 300, y: 120 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-zinc-900 opacity-75 rounded-2xl w-[200px] h-[180px]">
          <div className='text-white text-center pt-5 font-poppins font-medium'>
            Hey There !! 
          </div>
          <div className='font-poppins font-medium text-sm p-2 text-white'>
            I am a passionate web developer with experience in multiple hackathons 
          </div>
        </motion.div>

        <motion.button
          initial={{ x: 40, y: -200}}
          animate={
            hovered
            ? { x: 40, y: 150}
            : { x: 40, y: 240 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="opacity-0 bg-zinc-900 rounded-2xl w-[80px] h-[40px] text-white hover:bg-gradient-to-tr from-purple-800 via-fuchsia-800-800 to-black">
            View
        </motion.button>

        <motion.button
          initial={{ x: 90, y: -200}}
          animate={
            hovered
            ? { x: 90, y: 150}
            : { x: 90, y: 240 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={handleInvitation}
          className="bg-zinc-900 rounded-2xl w-[80px] h-[40px] text-white hover:bg-gradient-to-tr from-purple-800 via-fuchsia-800-800 to-black">
            Invite
        </motion.button>
      </div>
      
    </motion.div>
  )
}

export default UserCard