import React from 'react';
import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import teamsData from "./data/teams"
gsap.registerPlugin(ScrollTrigger);

const Teams = () => {
  const [hov, sethov] = useState(false);
  const [teamid, setteamid] = useState(1);

  const ishov = () => {
    sethov(true);
  }
  const notishov = () => {
    sethov(false);
  }

  useEffect(() => {
    gsap.to(".gsapanim", {
      y: "240vh",
      duration: 9,
      ease: "sine.inOut",
      repeat: -1,
    });
    gsap.to(".gsapanime", {
      y: "400vh",
      duration: 18,
      ease: "sine.inOut",
      repeat: -1,
    });

    gsap.to(".gsapanim2", {
      y: "-220vh",
      duration: 8,
      ease: "sine.inOut",
      repeat: -1,
    });
  }, []);

  // Extended team data array with additional fields


  // Find the currently selected team data
  const selectedTeam = teamsData.find(team => team.id === teamid) || teamsData[0];

  const TeamSelect = ({ teamid, teamname, teamdescription1, teamdescription2, taskspending, handleClick }) => {
    const [isTeamHovered, setIsTeamHovered] = useState(false);
    
    const handleMouseEnter = () => {
      setIsTeamHovered(true);
    }
    
    const handleMouseLeave = () => {
      setIsTeamHovered(false);
    }
    
    return (
      <div className='w-full h-fit border-[1px] rounded-2xl cursor-pointer border-cyan-600' onClick={handleClick}>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full relative h-fit py-5 px-6 items-center flex gap-7 backdrop-blur-lg -translate-y-[1px] -translate-x-[1px] rounded-2xl"
        >
          {/* Team Info - Moved to background */}
          <div className="absolute inset-0 flex items-center">
            <div className={`absolute left-[25%] flex-col justify-center z-0 transition-all duration-300 ease-in-out items-start w-[50%] ${isTeamHovered ? 'opacity-10' : ''}`}>
              <div className="text-2xl px-4 text-white">{teamname}</div>
              <div className="text-xs font-thin px-4 text-white">{teamdescription1}</div>
              <div className="text-xs font-thin px-4 text-white">{teamdescription2}</div>
            </div>
          </div>

          {/* Sliding Tasks Panel - Now above team info */}
          <div className={`backdrop-blur-md flex h-fit transition-all duration-500 ease-out justify-center items-center gap-10 absolute z-20 rounded-s-full rounded-e-full border-[1px] border-violet-800 bg-black/20 overflow-hidden ${isTeamHovered ? 'w-64 opacity-100' : 'w-0 opacity-0'}`}>
            <div className='overflow-x-hidden h-16'>
              <div className="flex flex-col justify-center overflow-hidden items-center h-full text-xs pl-6 text-white">
                <p className={`transition-all duration-300 ease-in-out delay-200 overflow-hidden ${isTeamHovered ? 'block' : 'w-0'}`}>{taskspending} Tasks Pending</p>
                <p className={`transition-all duration-300 ease-in-out delay-200 overflow-hidden ${isTeamHovered ? 'block' : 'w-0'}`}>New Tasks Assigned</p>
              </div>
            </div>
          </div>

          {/* Profile Image Container - Always on top */}
          <div className='relative w-16 h-fit'>
            <div className={`${isTeamHovered ? "bg-red-400 top-[2%] -left-[2px]" : "bg-purple-700 left-[2px] -top-[2px]"} translation-all duration-500 ease-in-out w-full h-full z-20 flex justify-start gap-10 absolute top-0 left-0 rounded-full p-[1px]`}></div>
            <img
              className="rounded-full sticky top-0 z-30 left-0 w-full h-full bg-black"
              src="src/assets/newt.png"
              alt="Team member"
            />
          </div>
        </div>
      </div>
    );
  }

  const RightSideView = ({ teamData }) => {
    return (
      <>
        <div className='absolute top-24'>
            <div className='h-fit z-40 overflow-hidden text-white backdrop-blur-2xl border-b-[1px] border-l-[1px] rounded-2xl border-b-violet-700 border-l-violet-700 pr-14 py-20 pl-20'>
              <div className='item flex justify-between items-center'> 
                <div className='flex gap-7 text-3xl justify-center items-center'>
                  <img className='w-20 rounded-2xl' src={`src/assets/${teamData.id}chalogo.png`} alt="Team logo" />        
                  {teamData.name}  
                </div>
                <div className='text-lg font-thin'>{teamData.hackathonName}</div>        
              </div>
              <div className='item text-lg py-8 bg-gradient-to-r to-blue-400 from-purple-500 via-white bg-clip-text text-transparent'>
                Project Description : {teamData.projectDescription}
              </div>
              <div className='item font-thin'>Project Link : {teamData.projectLink}</div>
              <div className='py-6 flex justify-start gap-8 '>
                <div onMouseEnter={ishov} onMouseLeave={notishov} className={`bg-gradient-to-br h-fit from-blue-500 via-black to-violet-950 w-fit rounded-2xl p-[1px] transition-all duration-500 ease-in-out ${hov ? '' : 'bg-gradient-to-br from-blue-500 via-black to-violet-950'}`}>

                  <div onMouseEnter={ishov} onMouseLeave={notishov} className='p-4 h-fit rounded-2xl bg-black w-fit flex items-center justify-center gap-1 transition-transform duration-500 ease-in-out'>
                    <img className='w-9' src='src/assets/hehe.png' alt="Tasks icon" />
                    <div onMouseEnter={ishov} onMouseLeave={notishov} className={` font-thin transition-all duration-500 ease-out text-sm  ${hov ? 'w-16 px-4' : 'w-0 px-0 overflow-hidden'}`}>TASKS</div>

                  </div>

                </div>

                <div className='absolute left-[30%]'>
                  <img className='w-16' src='src/assets/github.png' alt="GitHub" />
                </div>

              </div>

            </div>

            <div className='h-fit z-40 overflow-hidden text-white border-b-[1px] border-l-[1px] rounded-2xl border-b-violet-700 border-l-violet-700 pr-14 mt-10 py-20 pl-20 backdrop-blur-2xl w-full'>
              <div className='flex flex-row flex-wrap gap-12 justify-center items-center align-items'>
                {/* Team member cards - dynamic based on selected team */}
                {teamData.teamMembers.map((member, index) => (
                  <div key={index} className='w-40 h-fit p-7 items-center flex flex-col gap-6 justify-between rounded-xl backdrop-blur-2xl bg-gradient-to-bl from-slate-950 via-slate-800 to-slate-600 border-1 border-blue-500'>
                    <div className='font-thin'>{member.role}</div>
                    <div className='text-xs font-thin'>{member.tasks}</div>
                    <div className='flex flex-row justify-between w-full items-baseline'>
                      <div className='p-1 rounded-lg bg-cyan-700'><img className='w-5' src='src/assets/linkedin.png' alt="LinkedIn" /></div>
                      <div className='w-5 h-20 rounded-md border-cyan-700 border-[1px] shadow-xl shadow-black'></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </>
    );
  }

  return (
    <>
      <div className='flex animtrig flex-row h-[85vh] px-6 justify-center'>
        <div className='w-fit h-fit overflow-hidden py-10 pl-5'>
          <div className='h-[85vh] w-[35vw] z-10 overflow-y-auto relative scrollbar-none text-white'>
            <div className='w-full scrollbar-none sticky top-0 left-0 h-full'>
              {/* Animation elements */}
              <div className='anigsa'>
                <img className='w-80 absolute gsapanim left-0 top-[-90vh] -rotate-90' src='src/assets/rect2.png' alt="Animation" />
                <img className='w-80 absolute gsapanim left-4 top-[-110vh] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
                <img className='w-80 absolute gsapanim left-0 top-[-140vh] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
              </div>
              {/* More animation elements */}
              <div className='anigsa'>
                <img className='w-80 absolute gsapanime left-0 top-[-130vh] -rotate-90' src='src/assets/rect2.png' alt="Animation" />
                <img className='w-80 absolute gsapanime left-4 top-[-150vh] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
                <img className='w-80 absolute gsapanime left-0 top-[-180vh] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
              </div>
              {/* Rest of your animation elements */}
              <div>
                <img className='w-80 absolute gsapanim2 left-[45%] bottom-[-90%] -rotate-90' src='src/assets/rect2.png' alt="Animation" />
                <img className='w-80 absolute gsapanim2 left-[49%] bottom-[-120%] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
                <img className='w-80 absolute gsapanim2 left-[45%] bottom-[-160%] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
              </div>
              <div>
                <img className='w-80 absolute gsapanim left-[74%] top-[-90%] -rotate-90' src='src/assets/rect2.png' alt="Animation" />
                <img className='w-80 absolute gsapanim left-[70%] top-[-110%] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
                <img className='w-80 absolute gsapanim left-[74%] top-[-140%] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
              </div>
              <div className='anigsa'>
                <img className='w-80 absolute gsapanime left-[74%] top-[-130vh] -rotate-90' src='src/assets/rect2.png' alt="Animation" />
                <img className='w-80 absolute gsapanime left-[70%] top-[-150vh] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
                <img className='w-80 absolute gsapanime left-[74%] top-[-190vh] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
              </div>
            </div>
            
            {/* Team list section */}
            <div className='absolute left-0 w-[80%] h-full flex top-5 flex-col gap-5'>
              {teamsData.map((team) => (
                <TeamSelect 
                  key={team.id}
                  teamid={team.id} 
                  teamname={team.name} 
                  teamdescription1={team.description1} 
                  teamdescription2={team.description2} 
                  taskspending={team.tasksPending}
                  handleClick={() => setteamid(team.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right section (detailed team view) */}
        <div className='w-[75vw] h-[85vh] z-10 relative overflow-y-auto scrollbar-none py-10 pr-5'>
          <div className='w-full scrollbar-none sticky top-0 left-0 h-full'>
            <div className='anigsa'>
              <img className='w-80 absolute gsapanim left-[15%] top-[-90vh] -rotate-90' src='src/assets/rect2.png' alt="Animation" />
              <img className='w-80 absolute gsapanim left-[19%] top-[-110vh] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
              <img className='w-80 absolute gsapanim left-[15%] top-[-140vh] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
            </div>

            <div className='anigsa'>
              <img className='w-80 absolute gsapanime left-[15%] top-[-130vh] -rotate-90' src='src/assets/rect2.png' alt="Animation" />
              <img className='w-80 absolute gsapanime left-[19%] top-[-150vh] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
              <img className='w-80 absolute gsapanime left-[15%] top-[-180vh] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
            </div>

            <div>
              <img className='w-80 absolute gsapanim2 left-[45%] bottom-[-90%] -rotate-90' src='src/assets/rect2.png' alt="Animation" />
              <img className='w-80 absolute gsapanim2 left-[49%] bottom-[-120%] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
              <img className='w-80 absolute gsapanim2 left-[45%] bottom-[-160%] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
            </div>

            <div>
              <img className='w-80 absolute gsapanim left-[74%] top-[-90%] -rotate-90' src='src/assets/rect2.png' alt="Animation" />
              <img className='w-80 absolute gsapanim left-[70%] top-[-110%] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
              <img className='w-80 absolute gsapanim left-[74%] top-[-140%] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
            </div>

            <div className='anigsa'>
              <img className='w-80 absolute gsapanime left-[74%] top-[-130vh] -rotate-90' src='src/assets/rect2.png' alt="Animation" />
              <img className='w-80 absolute gsapanime left-[70%] top-[-150vh] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
              <img className='w-80 absolute gsapanime left-[74%] top-[-190vh] -rotate-90' src='src/assets/rect3.png' alt="Animation" />
            </div>
          </div>
          
          <RightSideView teamData={selectedTeam} />
        </div>
      </div>
    </>
  );
}

export default Teams;