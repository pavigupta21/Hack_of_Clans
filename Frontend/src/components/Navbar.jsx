import React, { useState } from 'react';
import { User2 } from 'lucide-react';
import Profile from './Profile'; // Make sure path is correct based on your file structure

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  
  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  return (
    <>
      <div
        className="fixed -top-0 left-[3vw] m-5 w-[90vw] bg-gradient-to-bl p-[1px] from-purple-950 to-purple-300 opacity-100 text-white rounded-2xl z-20"
      >
        <div className='bg-black rounded-2xl'>
          <div
            className="px-5 flex justify-between items-center rounded-2xl h-12"
          >
            <div className="text-white text-sm ml-[5vw]">STOP-PBL</div>
            <div className="flex justify-center gap-10 text-xs font-thin">
              <div>HOME</div>
              <div>EXPLORE</div>
              <div>MY TEAMS</div>
              <div>LOBBY</div>
            </div>
            <div 
                className={`profile-page flex items-center cursor-pointer mr-[5vw] p-2 rounded-full transition-colors duration-300 ${
                  profileOpen ? 'bg-purple-700 text-white' : 'hover:text-purple-300'
                }`}
                onClick={toggleProfile}
              >
                <User2 size={15}/>
            </div>
          </div>
        </div>
      </div>


<div 
  className={`fixed inset-0 z-50 ${profileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
>
  
  <div 
    className="fixed inset-y-0 right-0 w-[90vw] transition-transform duration-500 ease-in-out"
    style={{ 
      transform: profileOpen ? 'translateX(0)' : 'translateX(100%)' ,
      pointerEvents: 'auto'
    }}
  >
    {profileOpen && <Profile onClose={toggleProfile} />}
  </div>
</div>
    </>
  );
};

export default Navbar;