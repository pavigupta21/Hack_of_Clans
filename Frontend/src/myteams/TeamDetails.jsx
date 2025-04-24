import React, { useEffect } from 'react'
import { useChatStore } from '../store/chat.store.js'
import { useClanStore } from '../store/clan.store.js'
import { motion } from 'framer-motion'
import { ChevronLeft, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const TeamDetails = ({ onClick }) => {
    const { selectedTeam, fetchActiveTeam, selectedTeamName, activeTeamDetails, teamMembers, leader } = useChatStore()
    const { user } = useClanStore()
    const userId = user._id
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768)
    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await fetchActiveTeam({ selectedTeam, userId })
        }
        fetchData()
    }, [userId, selectedTeam, fetchActiveTeam])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleAddMem = () => {
        nav("/explore/all-users")
    }

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='text-white h-[90vh] flex flex-col bg-transparent backdrop-blur-md font-poppins rounded-lg relative overflow-hidden'
        >

            <div className='flex-1 overflow-y-auto custom-scrollbar'>

                {isMobile && (
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={onClick}
                        className="absolute left-4 top-4 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-all"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                        <span className="text-sm font-medium">Teams</span>
                    </motion.button>
                )}

                <div className='w-full flex flex-col items-center pt-16 md:pt-8 px-4'>
                    <div className='relative w-24 h-24 md:w-32 md:h-32'>
                        <div className='absolute inset-0 rounded-full overflow-hidden border-2 border-white/20 bg-black/30 backdrop-blur-md'>
                            <img 
                                src={activeTeamDetails?.logo || "./icons8-team-48.png"} 
                                alt="Team Logo" 
                                className='w-full h-full object-cover'
                                onError={(e) => {
                                    e.target.src = "./icons8-team-48.png"
                                }}
                            />
                        </div>
                    </div>
                    
                    <div className="p-4 mt-4 text-center">
                        <h1 className="font-poppins text-3xl md:text-4xl font-semibold bg-gradient-to-r from-gray-300 via-white to-violet-600 bg-clip-text text-transparent">
                            {selectedTeamName}
                        </h1>
                    </div>
                </div>

                <div className='px-6 py-4 mt-4 text-center'>
                    <div className='inline-block max-w-2xl p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10'>
                        <h2 className='text-lg font-medium text-gray-300 mb-2'>Team Description</h2>
                        <p className='text-gray-200'>
                            {activeTeamDetails?.description || "No description provided yet"}
                        </p>
                    </div>
                </div>

                <div className='px-6 py-4'>
                    <h2 className='text-xl font-semibold text-center mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent'>
                        Team Leader
                    </h2>
                    <div className='flex justify-center'>
                        <div className='flex items-center p-4 rounded-xl bg-purple-900/20 w-full max-w-md border border-purple-500/30'>
                            <div className='w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center mr-4'>
                                <span className='text-lg font-medium'>
                                    {leader?.name?.charAt(0) || leader?.email?.charAt(0) || 'L'}
                                </span>
                            </div>
                            <div>
                                <p className='font-medium text-lg'>
                                    {leader?.name || leader?.email || 'Unknown Leader'}
                                </p>
                                <p className='text-sm text-purple-300'>Team Founder</p>
                            </div>
                        </div>
                    </div>
                </div>

                {teamMembers?.length > 0 && (
                    <div className='px-6 py-4 pb-8'>
                        <h2 className='text-xl font-semibold text-center mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent'>
                            Team Members ({teamMembers.length})
                        </h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                            {teamMembers.map((member, index) => (
                                <div key={index} className='flex items-center p-4 rounded-xl bg-gray-800/20 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors'>
                                    <div className='w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3'>
                                        <span className='text-sm font-medium'>
                                            {member?.name?.charAt(0) || member?.email?.charAt(0) || 'M'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className='font-medium'>
                                            {member?.name || member?.email || 'Unknown Member'}
                                        </p>
                                        <p className='text-xs text-gray-400'>Member</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            {
              user._id == leader._id ? 
                <div className='flex justify-center'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddMem}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <UserPlus className="w-5 h-5" /> {/* Lucide icon */}
                    Add member
                  </motion.button>
                </div>
                : 
                <></>
            }
            </div>

        </motion.div>
    )
}

export default TeamDetails