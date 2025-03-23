import React, { useState, useRef, useEffect } from 'react'
import { Edit, Check, Camera, LogOut, Key, Github, Instagram, Linkedin, Award, Users, Code, CodepenIcon, Plus, X } from 'lucide-react'
import gsap from 'gsap' // Import GSAP

const Profile = ({ onClose }) => {
  // State for user data
  const [userData, setUserData] = useState({
    name: 'Tanmay Nawlakhe',
    email: 'tanmay@example.com',
    phone: '+91 9876543210',
    username: 'tanmay_nawlakhe',
    github: 'tanmay-nawlakhe',
    instagram: 'tanmay.codes',
    linkedin: 'tanmaynawlakhe'
  })
  
  // State for teams
  const [teams, setTeams] = useState([
    { id: 1, name: 'DevStorm', role: 'Team Lead', members: 4, project: 'AI Assistant' },
    { id: 2, name: 'ByteCoders', role: 'Developer', members: 3, project: 'E-commerce Platform' }
  ])
  
  // State for hackathons
  const [hackathons, setHackathons] = useState([
    { id: 1, name: 'HackSphere 2024', position: '1st Place', date: 'Feb 2024', tech: 'React, Node.js' },
    { id: 2, name: 'CodeQuest', position: 'Finalist', date: 'Nov 2023', tech: 'Python, TensorFlow' },
    { id: 3, name: 'DevJam', position: '2nd Place', date: 'Aug 2023', tech: 'Flutter, Firebase' }
  ])
  
  // State for tech skills
  const [skills, setSkills] = useState([
    { id: 1, name: 'React' },
    { id: 2, name: 'Node.js' },
    { id: 3, name: 'Python' },
    { id: 4, name: 'TypeScript' },
    { id: 5, name: 'TailwindCSS' },
    { id: 6, name: 'MongoDB' },
    { id: 7, name: 'REST API ' },
    { id: 8, name: 'GraphQL' }
  ])
  
  // Single editing state for the whole profile
  const [isEditing, setIsEditing] = useState(false)
  const [activeSection, setActiveSection] = useState('teams')
  
  const [isHovering, setIsHovering] = useState(false)
  
  // Add a ref to track the currently focused input
  const [focusedField, setFocusedField] = useState(null)
  const inputRefs = useRef({})
  
  // Refs for the background circles
  const bgCircle1Ref = useRef(null)
  const bgCircle2Ref = useRef(null)
  
  // Ref for the container to get its dimensions
  const containerRef = useRef(null)
  
  // Effect to restore focus after render
  useEffect(() => {
    if (isEditing && focusedField && inputRefs.current[focusedField]) {
      inputRefs.current[focusedField].focus()
    }
  }, [userData, isEditing, focusedField])
  
  // Effect for GSAP animations with boundary constraints
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Get container dimensions for bounding
    const container = containerRef.current;
    const containerHeight = container.clientHeight;
    
    // Calculate safe animation distances
    // For circle1 (top-to-bottom), y value should be constrained to container height minus circle height
    const circle1Height = bgCircle1Ref.current.clientHeight;
    const maxY1 = containerHeight - circle1Height - 100; // Subtract additional padding
    
    // For circle2 (bottom-to-top), ensure it stays within view as well
    const circle2Height = bgCircle2Ref.current.clientHeight;
    const maxY2 = containerHeight - circle2Height - 100; // Subtract additional padding
    
    // First circle animation - from top to bottom with constraints
    gsap.to(bgCircle1Ref.current, {
      y: Math.min(700, maxY1), // Use the smaller of 700px or maxY1
      duration: 8,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    })
    
    // Second circle animation - constrained movement
    gsap.fromTo(
      bgCircle2Ref.current, 
      { y: 0 },
      { 
        y: Math.min(500, maxY2), // Use the smaller of 500px or maxY2
        duration: 10,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      }
    )
    
    // Clean up animations on unmount
    return () => {
      gsap.killTweensOf(bgCircle1Ref.current)
      gsap.killTweensOf(bgCircle2Ref.current)
    }
  }, []) // Empty dependency array ensures this runs only once on mount

  const handleChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value
    })
    // Keep track of which field is being edited
    setFocusedField(field)
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEditing(false)
    // Here you would typically save the data to your backend
  }
  
  // Individual field component with or without edit functionality
  const ProfileField = ({ label, field }) => (
    <div className='flex flex-row items-center w-full mb-3 transition-all duration-300'>             
      <div className='font-thin text-gray-400 pr-2 whitespace-nowrap w-20 text-sm'>{label}</div>
      {isEditing ? (
        <input                   
          type="text"                   
          value={userData[field]}                   
          onChange={(e) => handleChange(field, e.target.value)}
          ref={el => inputRefs.current[field] = el}
          onFocus={() => setFocusedField(field)}                  
          className='py-1 px-2 border bg-black align-middle flex-1 rounded-lg border-gray-200 text-gray-300 font-thin focus:outline-none focus:border-purple-500 transition-all duration-300'
        />
      ) : (
        <div className='px-2 py-1 border border-gray-700 font-thin flex rounded-lg align-middle items-center flex-1 transition-all duration-300 truncate'>
          {userData[field]}
        </div>
      )}           
    </div>
  )

  const SocialField = ({ label, field, icon }) => (
    <div className='flex flex-row items-center w-full mb-3 transition-all duration-300'>             
      <div className='font-thin text-gray-400 pr-2 flex items-center gap-1 w-20 text-sm'>
        {icon}
        <span>{label}</span>
      </div>
      {isEditing ? (
        <input                   
          type="text"                   
          value={userData[field]}                   
          onChange={(e) => handleChange(field, e.target.value)}
          ref={el => inputRefs.current[field] = el}
          onFocus={() => setFocusedField(field)}                 
          className='py-1 px-2 border bg-black align-middle flex-1 rounded-lg border-gray-200 text-gray-300 font-thin focus:outline-none focus:border-purple-500 transition-all duration-300'
        />
      ) : (
        <div className='px-2 py-1 border border-gray-700 font-thin flex rounded-lg align-middle items-center flex-1 transition-all duration-300 truncate'>
          {userData[field]}
        </div>
      )}           
    </div>
  )

  const TeamCard = ({ team }) => (
    <div className='p-4 border border-gray-700 rounded-lg mb-3 hover:border-purple-500 transition-all duration-300 bg-gray-900 bg-opacity-60'>
      <div className='flex justify-between items-center'>
        <h3 className='text-white'>{team.name}</h3>
        <span className='text-xs px-2 py-1 bg-purple-900 rounded-full'>{team.role}</span>
      </div>
      <div className='mt-2 text-sm text-gray-400'>
        <div className='flex items-center gap-2'>
          <Users size={14} />
          <span>{team.members} members</span>
        </div>
        <div className='flex items-center gap-2 mt-1'>
          <Code size={14} />
          <span>Project: {team.project}</span>
        </div>
      </div>
    </div>
  )

  const HackathonCard = ({ hackathon }) => (
    <div className='p-4 border border-gray-700 rounded-lg mb-3 hover:border-purple-500 transition-all duration-300 bg-gray-900 bg-opacity-60'>
      <div className='flex justify-between items-center'>
        <h3 className='text-white'>{hackathon.name}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${hackathon.position.includes('1st') ? 'bg-yellow-700' : hackathon.position.includes('2nd') ? 'bg-slate-600' : 'bg-orange-900'}`}>
          {hackathon.position}
        </span>
      </div>
      <div className='mt-2 text-sm text-gray-400'>
        <div className='flex items-center gap-2'>
          <Award size={14} />
          <span>{hackathon.date}</span>
        </div>
        <div className='flex items-center gap-2 mt-1'>
          <Code size={14} />
          <span>Tech: {hackathon.tech}</span>
        </div>
      </div>
    </div>
  )

  const SkillItem = ({ skill }) => (
    <div className='px-4 py-3 border border-gray-700 rounded-lg hover:border-purple-500 transition-all duration-300 bg-gray-900 bg-opacity-60 flex items-center gap-2'>
      <span className='text-gray-300'>{skill.name}</span>
    </div>
  );

  const TabButton = ({ name, label, icon }) => (
    <button 
      onClick={() => setActiveSection(name)}
      className={`px-4 py-2 flex items-center gap-2 transition-all duration-300 border-b-2 ${activeSection === name ? 'border-purple-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-300'}`}
    >
      {icon}
      {label}
    </button>
  )

  return (   
    <div 
      ref={containerRef}
      className='w-fit h-[80vh] z-40 absolute top-[15vh] right-[94.5vw] rounded-xl justify-center items-center flex '
    >
      {/* Background container with overflow hidden */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* Background circles with refs for GSAP animations */}
        <div 
          ref={bgCircle1Ref} 
          className='bgcircle absolute top-[10%] left-[10vw] w-44 h-72 rounded-full bg-purple-900'
        ></div>
        <div 
          ref={bgCircle2Ref} 
          className='bgcircle2 absolute top-0 left-[50vw] w-32 h-32 rounded-full bg-blue-900'
        ></div>
      </div>

      <div className='w-fit h-full flex absolute top-0 left-0 justify-center items-center text-white z-50'>       
        <div className='w-[90vw] rounded-xl h-full p-6 backdrop-blur-3xl flex flex-row gap-6 relative'>       
          {/* Close button - only if onClose prop exists */}
          {onClose && (
            <button 
              onClick={onClose}
              className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 z-10'
            >
              <X size={16} />
            </button>
          )}
          
          {/* Left Side - Original Profile Component */}
          <div className='w-[28vw] h-full overflow-y-auto pr-2 flex flex-col'>
            <div className='profile-details flex justify-between flex-col items-center h-full'>           
              {/* Profile photo with hover overlay */}           
              <div              
                className='w-fit relative mt-5 group'             
                onMouseEnter={() => setIsHovering(true)}             
                onMouseLeave={() => setIsHovering(false)}           
              >             
                <img className='rounded-full h-24 w-24 object-cover transition-all duration-300' src='/src/assets/user3.png' alt="Profile" />             
                {isHovering && (               
                  <div className='absolute inset-0 bg-black bg-opacity-50 rounded-full flex justify-center items-center cursor-pointer'>                 
                    <div className='flex flex-col items-center animate-fade-in'>                   
                      <Camera size={16} />                   
                      <span className='text-xs mt-1'>Change</span>                 
                    </div>               
                  </div>             
                )}           
              </div>                      
              
              <div className='w-full h-fit flex justify-between items-center mb-4'>
                <div className='bg-gradient-to-r from-purple-500 to-purple-700 w-fit bg-clip-text text-transparent text-lg'>
                  Personal Details
                </div>
                
                {/* Edit/save button properly positioned */}
                <div className='flex items-center'>
                  {isEditing ? (
                    <button 
                      onClick={handleSubmit}
                      className='flex items-center justify-center bg-gray-600 rounded-full w-8 h-8 transition-all duration-300 hover:bg-green-600'
                    >                   
                      <Check size={16} className="text-white" />                 
                    </button>
                  ) : (
                    <button 
                      className='flex items-center justify-center rounded-full cursor-pointer bg-gray-700 w-8 h-8 hover:bg-gray-600 transition-all duration-300' 
                      onClick={toggleEdit}
                    >                   
                      <Edit size={16} className="text-white" />                 
                    </button>
                  )}
                </div>
              </div>
              
              {/* Profile fields in a form */}
              <form onSubmit={handleSubmit} className='w-full'>
                <div className='mb-3'>
                  <ProfileField label="Name" field="name" />
                  <ProfileField label="Username" field="username" />
                  <ProfileField label="Email" field="email" />
                  <ProfileField label="Phone" field="phone" />
                  <SocialField label="Github" field="github" icon={<Github size={18} />} />
                  <SocialField label="Instagram" field="instagram" icon={<Instagram size={18} />} />
                  <SocialField label="LinkedIn" field="linkedin" icon={<Linkedin size={18} />} />
                </div>
              </form>
            </div>
          </div>

          {/* Middle Column - Teams & Hackathons */}
          <div className='w-[28vw] h-full flex flex-col'>
            <div className='flex border-b border-gray-700 mb-4'>
              <TabButton name="teams" label="My Teams" icon={<Users size={16} />} />
              <TabButton name="hackathons" label="Hackathons" icon={<Award size={16} />} />
            </div>

            <div className='overflow-y-auto pr-2 flex-grow'>
              {activeSection === 'teams' && (
                <div className='animate-fade-in'>
                  <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-lg bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent'>My Teams</h2>
                    <button className='text-xs px-3 py-1 bg-purple-800 hover:bg-purple-700 rounded-lg transition-all duration-300 flex items-center gap-1'>
                      <Plus size={12} />
                      New Team
                    </button>
                  </div>
                  {teams.map(team => (
                    <TeamCard key={team.id} team={team} />
                  ))}
                </div>
              )}

              {activeSection === 'hackathons' && (
                <div className='animate-fade-in'>
                  <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-lg bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent'>My Hackathons</h2>
                    <button className='text-xs px-3 py-1 bg-purple-800 hover:bg-purple-700 rounded-lg transition-all duration-300 flex items-center gap-1'>
                      <Plus size={12} />
                      Add Hackathon
                    </button>
                  </div>
                  {hackathons.map(hackathon => (
                    <HackathonCard key={hackathon.id} hackathon={hackathon} />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Tech Skills */}
          <div className='w-[28vw] h-full p mt-1 flex flex-col'>
            <div className='mb-4 border-b border-gray-700 pb-2'>
              <h2 className='text-lg text-white'>My Tech Skills</h2>
            </div>
            
            <div className='overflow-y-auto pr-2 flex-grow'>
              <div className='flex justify-between items-center mt-2 mb-4'>
                <span className='text-sm text-gray-400'>Your technical skills</span>
                <button className='text-xs px-3 py-1 bg-purple-800 hover:bg-purple-700 rounded-lg transition-all duration-300 flex items-center gap-1'>
                  <Plus size={12} />
                  Add Skill
                </button>
              </div>
              
              <div className='grid grid-cols-3 gap-2'>
                {skills.map(skill => (
                  <SkillItem key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
            
            {/* Action buttons relocated here */}
            <div className='w-full mt-auto border-t border-gray-700 pt-3'>
              <div className='flex justify-end gap-2 mt-1 mb-5'>
                <button className='flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 text-sm'>
                  <Key size={14} />
                  <span>Reset Password</span>
                </button>
                <button className='flex items-center gap-1 px-2 py-1 rounded-lg bg-red-900 hover:bg-red-800 transition-all duration-300 text-sm'>
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  ) 
}  

export default Profile