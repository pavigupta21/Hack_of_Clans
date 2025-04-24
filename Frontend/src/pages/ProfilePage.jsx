import { BellRing, Camera, LogOut } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import AnimLine from '../components/AnimLine'
import PersonalInfo from '../components/PersonalInfo'
import PersonalLinks from '../components/PersonalLinks'
import Skills from '../components/Skills'
import Warriors from '../components/Warriors'
import { useClanStore } from '../store/clan.store.js'
import {motion} from 'framer-motion'
import BgAnim from '../myteams/BgAnim.jsx'
import NotificationPanel from '../components/NotificationPanel.jsx'
import { useChatStore } from '../store/chat.store.js'

const ProfilePage = () => {

    const {user, skills, personal_Info, personal_links, updateProfile, profilePic, isLoading, logout } = useClanStore();
    const {getNotification} = useChatStore()
    const [displayCount, setDisplayCount] = useState(window.innerWidth < 768 ? 2 : 3);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768 ? 1 : 0 );
    const [openNotificaionPanel, setNotificationPanel] = useState(0); 


    useEffect(() => {
      const handleResize = () => {
        setDisplayCount(window.innerWidth < 768 ? 2 : 3);
        setIsMobile(window.innerWidth < 768 ? 1 : 0)
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
  
      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImg(base64Image);
        // await updateProfile({ profilePic: base64Image });
      };
    };

    console.log("iser is : ",user)



    const handleUpdate = async() => {
        await updateProfile(user, skills,  personal_Info, personal_links, selectedImg);
    }

    console.log("Profile pic is ",(user.profilPic)) 

    const openNotification = async() => {
      await getNotification({userId: user._id})
      setNotificationPanel(1);
    }
  
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-scroll custom-scrollbar"> 

    {
      openNotificaionPanel ? 
      <>
        <div className='w-full h-full bg-transparent backdrop-blur-lg fixed top-0 right-0 z-20 flex justify-center items-center'>
          <NotificationPanel handleClose = {() => setNotificationPanel(0)}/> 
        </div>
      </> 
      : 
      <>
      </>
    }

    <div className='fixed inset-0 top-0 bottom-0 z-0'>
      <BgAnim/>
    </div>

      {!isMobile && (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <Warriors />
        </div>
      )}


      <div className="relative z-10 pt-16 flex justify-center overflow-x-scroll custom-scrollbar">
        <div className="max-w-2xl w-full mx-2 bg-transparent backdrop-blur-2xl border rounded-xl p-4">
        <motion.button
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        onClick={openNotification}
        className='fixed top-0 right-0 p-2 m-2 bg-gray-900 hover:bg-gray-700 rounded-full'>
          <BellRing className='size-7'/>
        </motion.button>
        <motion.button
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        onClick={() => logout()}
        className='fixed top-0 right-12 p-2 m-2 bg-gray-900 hover:bg-gray-700 rounded-full'>
          <LogOut className='size-7'/>
        </motion.button>
          <div className="flex justify-center mt-16">
            <div className="bg-gradient-to-l from-purple-800 via-fuchsia-900 to-red-800 border-2 rounded-full relative">
            <img
                src={selectedImg || user.profilPic || "./default_user.png"}
                alt={user.name || "User"}
                className="w-32 h-32 object-cover rounded-full"
              />
              <label htmlFor="profile_pic_upload" className="absolute bottom-0 right-0 p-1 bg-black rounded-full cursor-pointer border">
                <Camera />
              </label>
              <input type="file" id="profile_pic_upload" accept="image/*" className="hidden" onChange={handleImageUpload}/>
            </div>
          </div>

          <div className="mt-12">
            <AnimLine />
          </div>

          <div className="bg-transparent py-2 rounded-lg mt-4 mb-4">
            <div className="rounded-2xl bg-gradient-to-l from-black via-gray-900 to-gray-800 font-poppins font-medium py-2 px-4">
              {`${user.name}`}
            </div>
            <div className="rounded-2xl bg-gradient-to-l from-black via-gray-900 to-gray-800 font-poppins font-medium mt-4 py-2 px-4">
            {`${user.email}`}
            </div>
          </div>

          <PersonalInfo />
          <PersonalLinks />
          <Skills display={displayCount} isMobile={isMobile} />

        <div className='flex justify-center'>
            <motion.button 
            whileHover={{scale:1.05}}
            whileTap={{scale:0.5}}
            onClick={handleUpdate}
            className={`p-2 rounded-lg bg-gradient-to-r from-purple-900 via-fuchsia-800 to-black font-poppins hover:text-pink-500 transition duration-300 ${isLoading ? "animate-pulse" : "" } `}>
                Update
            </motion.button>
        </div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
