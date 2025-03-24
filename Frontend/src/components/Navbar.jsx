import React, { useState, useEffect } from 'react';
import { User2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Profile from './Profile';

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    let timer;
    if (profileOpen) {
      setShowProfile(true);
    } else {
      timer = setTimeout(() => {
        setShowProfile(false);
      }, 500); // Match this to your transition duration
    }
    
    return () => clearTimeout(timer);
  }, [profileOpen]);

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const isActive = (path) => {
    return location.pathname === path || 
           (location.pathname === '/' && path === '/explore');
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
              <Link to="/home" className={isActive('/home') ? 'text-purple-300' : ''}>HOME</Link>
              <Link to={`/explore`} className={isActive('/explore') ? 'text-purple-300' : ''}>EXPLORE</Link>
              <Link to="/teams" className={isActive('/teams') ? 'text-purple-300' : ''}>MY TEAMS</Link>
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
            transform: profileOpen ? 'translateX(0)' : 'translateX(100%)',
            pointerEvents: 'auto'
          }}
        >
          {showProfile && <Profile onClose={toggleProfile} />}
        </div>
      </div>
    </>
  );
};

export default Navbar;