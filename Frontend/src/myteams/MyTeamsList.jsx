import React, { useEffect, useState, useRef } from 'react';
import { useClanStore } from '../store/clan.store';
import { useChatStore } from '../store/chat.store';
import { motion, AnimatePresence } from 'framer-motion';
import animationData from '../assets/Search_Chat.json';
import Lottie from "lottie-react";
import MT_Team from './MT_Team';
import { useTeamStore } from '../store/team.store';

const MyTeamsList = ({ isMobile, setIsChatting }) => {
  const { user, getUserTeams, userTeams  } = useClanStore();
  const { selectedTeam, setSelectedTeam , fetchActiveTeam , activeTeamDetails } = useChatStore();
  const { createTeam } = useTeamStore();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [teamData, setTeamData] = useState({
    teamName: '',
    hackathonName: '',
    description: '',
    logo: null
  });
  const [previewLogo, setPreviewLogo] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user?._id) {
      getUserTeams(user._id);
    }
  }, [user._id]);

  useEffect(() => {
    fetchActiveTeam(selectedTeam, user._id); 
    console.log("active team : ", activeTeamDetails);
    
  },[selectedTeam, setSelectedTeam])

  const handleCreateTeam = () => {
    setShowCreateForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1]; 
            setTeamData(prev => ({
                ...prev,
                logo: base64String
            }));
            setPreviewLogo(reader.result);
        };
        reader.readAsDataURL(file);
    }
};


  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await createTeam({
            teamName: teamData.teamName,
            hackathon: teamData.hackathonName,
            description: teamData.description,
            userId: user._id,
            logo: teamData.logo ? `data:image/jpeg;base64,${teamData.logo}` : null
        });
        
        setShowCreateForm(false);
        setTeamData({
            teamName: '',
            hackathonName: '',
            description: '',
            logo: null
        });
        setPreviewLogo(null);
        getUserTeams(user._id);
    } catch (error) {
        console.error("Error creating team:", error);
    }
};

  return (
    <div className='relative flex flex-col h-full overflow-y-scroll custom-scrollbar rounded-lg shadow-lg max-w-lg w-full min-h-[500px]'>

      <div className={showCreateForm ? 'backdrop-blur-lg' : ''}>
        {Array.isArray(userTeams) && userTeams.length > 0 ? (
          userTeams.map((team, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setSelectedTeam(team._id);
                if (isMobile) setIsChatting(1);
              }}
              className='max-w-sm w-full'
            >
              <MT_Team
                teamName={team.teamName}
                teamId={team._id}
                selectedTeamId={selectedTeam}
                teamLogo={team.logo}
              />
            </motion.button>
          ))
        ) : (
          <div className='flex flex-col items-center h-full min-h-[675px]'>
            <Lottie animationData={animationData} loop={true} className="max-w-sm w-full h-64" />
            <p className="text-gray-500 text-center mt-4">No teams found</p>
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCreateTeam}
        className='fixed bottom-4 right-4 text-white bg-gradient-to-br from-gray-950 via-violet-950 to-fuchsia-800 p-3 rounded-lg shadow-lg z-40'
      >
        Create Team
      </motion.button>

      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-gradient-to-br from-gray-950 via-violet-950 to-fuchsia-800 p-6 rounded-xl max-w-md w-full mx-4 border border-gray-700 shadow-2xl"
            >
              <h2 className="text-xl font-bold mb-4 text-white font-poppins">Create New Team</h2>

              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4 flex flex-col items-center">
                  <div
                    onClick={triggerFileInput}
                    className="w-24 h-24 rounded-full bg-gray-800 border-2 border-dashed border-purple-500 flex items-center justify-center cursor-pointer mb-2 overflow-hidden"
                  >
                    {previewLogo ? (
                      <img
                        src={previewLogo}
                        alt="Team logo preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">Logo</span>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="text-sm text-purple-300 hover:text-purple-100 mt-1"
                  >
                    {previewLogo ? 'Change logo' : 'Upload logo'}
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Team Name</label>
                  <input
                    type="text"
                    name="teamName"
                    value={teamData.teamName}
                    onChange={handleInputChange}
                    placeholder='Wireless Bombers'
                    className="w-full px-3 py-2 bg-gradient-to-r from-gray-950 via-gray-900 to-violet-950 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    required
                    autoFocus
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Hackathon Name</label>
                  <input
                    type="text"
                    name="hackathonName"
                    value={teamData.hackathonName}
                    onChange={handleInputChange}
                    placeholder='Hack the Future 2026'
                    className="w-full px-3 py-2 bg-gradient-to-r from-gray-950 via-gray-900 to-violet-950 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={teamData.description}
                    onChange={handleInputChange}
                    placeholder='Cool team for cool people'
                    className="w-full px-3 py-2 bg-gradient-to-br from-gray-950 via-gray-900 to-violet-950 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    rows="3"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <motion.button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false);
                      setPreviewLogo(null);
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 bg-gradient-to-br from-black via-gray-800 to-gray-700 rounded-lg text-white"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg text-white font-medium"
                  >
                    Create Team
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyTeamsList;