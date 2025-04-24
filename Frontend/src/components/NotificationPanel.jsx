import { X } from 'lucide-react'
import React from 'react'
import {motion} from 'framer-motion'
import { useChatStore } from '../store/chat.store'
import { useTeamStore } from '../store/team.store'
import { useClanStore } from '../store/clan.store'

const NotificationPanel = ({handleClose}) => { 

    const {userNotifications } = useChatStore(); 
    const { user } = useClanStore();
    const { acceptInvitation , acceptReq} = useTeamStore();

    console.log(userNotifications);
    
    const handleAccept = async(ele) => {
        console.log("ele is :" , ele);
        
        console.log("accept invite :",{userId: user._id, teamId: ele.from });
        ele.isReq ? 
        await acceptInvitation(user._id, ele.from ) 
        : 
        await acceptReq(ele.from, ele.to)
    }   

    const handleReject = () => {

    }

    
    

  return (
    <motion.div 
    initial={{y:40, opacity:0}}
    animate={{y:0, opacity:100}}
    transition={{duration:0.5, ease:"backOut"}}
    className='w-4/5 md:max-w-md md:w-full bg-gradient-to-br from-pink-700 via-gray-800 to-gray-950 backdrop-blur-lg border-2 h-[50vh] relative rounded-lg p-4 overflow-y-scroll custom-scrollbar'> 
        <motion.button 
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            onClick={handleClose}
            className='absolute top-0 right-0 bg-gray-950 hover:bg-gray-700 rounded-full'>
            <X className='size-5'/> 
        </motion.button>

        <div className='font-poppins text-xl text-center'>
            Notification Panel
        </div> 

        <div className='flex flex-col justify-center items-center'>
            {
                userNotifications.length ? 
               ( userNotifications.map((ele, i) => 
                <motion.div className='max-w-sm w-full bg-gray-950 rounded-lg my-1'>
                    <div className='text-start p-1 text-pink-800 font-poppins font-semibold'>
                    <span className='text-gray-300'> From : </span> {ele.senderName}
                    </div>
                    <div className='text-center pb-2 text-gray-300'>
                        {ele.heading}
                    </div>
                    <div className='text-center text-gray-400'>
                        {ele.content}
                    </div>

                        <div className='flex justify-evenly my-2 '>
                            <motion.button 
                            whileHover={{scale:1.05}}
                            whileTap={{scale:0.95}}
                            onClick={() => handleAccept(ele)}
                            className='bg-gradient-to-br from-emerald-500 via-green-700 to-emerald-950 px-2 rounded-md'>
                                Accept
                            </motion.button>
                            <motion.button
                                whileHover={{scale:1.05}}
                                whileTap={{scale:0.95}}
                                onClick={handleReject}
                                className='bg-gradient-to-br from-gray-600 via-gray-700 to-emerald-950 px-2 rounded-md'>
                                Reject
                            </motion.button>
                        </div>
                </motion.div>
                ) ) 
                :
                (<div className='text-gray-400 mt-10'>
                    No Notifications 
                </div>)
            }
            
        </div>


    </motion.div>
  )
}

export default NotificationPanel