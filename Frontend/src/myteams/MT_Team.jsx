import React, { useEffect } from 'react';

const MT_Team = ({ teamName, teamId, selectedTeamId, teamLogo }) => {
    const isActive = teamId == selectedTeamId; 

    return (
        <div className={`max-w-lg w-full h-[70px] mb-2 rounded-3xl overflow-hidden relative`}>
            {/* Background layers */}
            <div className={`absolute inset-0 ${isActive ? 
                "bg-gradient-to-r from-violet-900/70 via-cyan-950/70 to-gray-950/70" : 
                "bg-gray-950/70"} backdrop-blur-xl border ${isActive ? 
                "border-cyan-400/30" : "border-white/10"} rounded-3xl`}>
                
                <div className={`absolute inset-0 bg-gradient-to-r ${isActive ? 
                    "from-cyan-400/10 via-transparent to-purple-500/10" : 
                    "from-gray-400/5 via-transparent to-gray-600/5"} animate-shimmer`}></div>
            </div>
            

            <div className='relative flex items-center h-full z-10 pl-2'>

                <div className='relative flex-shrink-0 w-12 h-12 md:w-14 md:h-14'>
                    <div className='absolute inset-0 rounded-full overflow-hidden border-2 border-white/20 bg-black/30 backdrop-blur-md'>

                        <img 
                            src={teamLogo || "./icons8-team-48.png"} 
                            alt="Team Logo" 
                            className='w-full h-full object-cover'
                            onError={(e) => {
                                e.target.src = "./icons8-team-48.png";
                            }}
                        />
                    </div>

                    {isActive && (
                        <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full border-2 border-gray-900'></div>
                    )}
                </div>
                
                <div className='font-poppins font-medium text-white pl-3 md:pl-4 truncate max-w-[70%]'>
                    {teamName}
                </div>
            </div>
        </div>
    )
}

export default MT_Team;