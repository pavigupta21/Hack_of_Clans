import React, { useState } from 'react';

const Card2 = ({teamid, teamname, domain, bio, members }) => {
  const [hovered, setHovered] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className='py-8'>

      <div
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className={`relative flex flex-col justify-center items-center w-[25vw] h-[75vh] transition-all ease-in-out duration-800 overflow-hidden`}
      >
        <div
          className={`absolute inset-0 rounded-3xl border-[1px] border-purple-400 transition ease-in-out duration-800 ${hovered ? 'bg-gradient-to-bl from-[#571E7A8F] via-[#4E40588F] to-[#3530398F] opacity-70' : 'bg-gradient-to-bl from-black via-black to-slate-500  opacity-70'
            }`}
        ></div>

        <div className="relative opacity-20">
          <div className={`flex flex-col transition-all duration-1000 ease-in-out h-fit w-32 rotate-[90deg] ${hovered ? 'translate-y-[30%]' : '-translate-y-[30%]'}`}>
          <div
              className={`w-[120px] absolute top-0 left-0 h-[50px]  translate-y-44 transition-all duration-1000 ease-in-out rounded-full bg-slate-500 ${hovered ? 'translate-x-[200px]' : 'translate-x-[400px]'
                }`}
            ></div>
          <div
              className={`w-[280px] absolute top-0 right-0 h-[50px]  translate-y-32 transition-all duration-1000 ease-in-out rounded-full bg-slate-500 ${hovered ? '-translate-x-[100px]' : '-translate-x-[300px]'
                }`}
            ></div>
            
            <div
              className={`w-[450px] h-[50px] transition-all translate-y-10 duration-1000 ease-in-out rounded-full bg-slate-500 ${hovered ? '-translate-x-[125px]' : 'translate-x-[100%]'
                }`}
            ></div>

              
            <div
              className={`w-[250px] h-[50px] -translate-y-24 transition-all duration-1000 ease-in-out rounded-full bg-slate-500 ${hovered ? 'translate-x-[30%]' : 'translate-x-[200%]'
                }`}
            ></div>

<div
              className={`w-[250px] absolute bottom-0 right-[300px] h-[50px] -translate-y-24 transition-all duration-1000 ease-in-out rounded-full bg-slate-500 ${hovered ? ' translate-x-[90px]' : ''
                }`}
            ></div>
            
          </div>
        </div>

        <div className="absolute left-0 top-0 p-12 text-xl flex flex-col items-center justify-between text-center h-full overflow-hidden text-slate-200">
          <div>
          <div className='h-fit flex flex-row justify-between pb-4 items-center '>
              <div className={`h-20 w-20 bg-black bg-opacity-60 rounded-2xl transition-all`}>
                <img className={` ${isFallback ? 'p-3' : ''}`}
                  src={`/src/assets/${teamid}chalogo.png`}
                  onError={(e) => {
                    e.currentTarget.src = "/src/assets/Group.png";
                    setIsFallback(true);
                  }}
                  alt="Team Logo"
                />
              </div>
              <div className='flex flex-col justify-center items-center'>
                <div className='text-lg'>{teamname}</div>
                <div className='text-sm font-thin w-44'>{domain}</div>
              </div>
            </div>

            <div className='relative flex flex-col justify-center items-center '>
              <div className={` text-xs text-left my-4 transition-all duration-500 ease-in-out ${hovered ? 'opacity-0 translate-x-[5%]' : 'opacity-100'}`}>
                <span className='text-sm'>Team Bio : </span>{bio}
              </div>
              <div className={`absolute top-4 transition-all duration-1000 ease-in-out bg-gray-400 rounded-3xl w-[85%] h-[70%] -z-10  ${hovered ? 'opacity-20 right-0 ' : 'right-[-100%] opacity-0'}`}></div>
              <div className={`absolute top-8 w-[70%]  h-fit left-16 flex flex-col justify-start items-start p-3 transition-all duration-1000 ease-in-out  ${hovered ? 'opacity-100 right-0 ' : 'left-[130%] opacity-100'}`}>
                <div className='pb-5' >Hey There !!</div>
                <div className='font-thin text-start pb-5 text-xs'>We are currently looking for people with great backend skills, mostly proficient in Next.JS, Node.JS and MongoDB.</div>
                <div className='flex flex-wrap gap-2 '>
                  <div className=' flex justify-center items-center gap-2 py-1 px-2 rounded-e-full rounded-s-full bg-gray-500 bg-opacity-50 text-sm font-thin'><div className='w-1 h-1 rounded-full bg-purple-400'></div>Node.JS</div>
                  <div className=' flex justify-center items-center gap-2 py-1 px-3 rounded-e-full rounded-s-full bg-gray-500 bg-opacity-50 text-sm font-thin'><div className='w-1 h-1 rounded-full bg-purple-950'></div>MongoDB</div>
                </div>
              </div>

              <div className={` text-base text-center flex flex-col  justify-center items-center mb-4 transition-all duration-500 ease-in-out ${hovered ? 'opacity-0 ' : 'opacity-100'}`}>
                TEAM MEMBERS
                <div className='flex mt-3 text-sm flex-row gap-4 justify-center items-center '>
                  <div className='w-fit flex flex-col items-center justify-center'>
                    <div><img className='rounded-full w-12 h-12' src='/src/assets/user2chalogo.png' /></div>
                    <div className='text-sm py-1'>Username</div>
                    <div className='flex text-xs flex-col items-center justify-center'><span>Skill1</span><span>Skill2</span><span>Skill3</span><span>...</span></div>
                  </div>

                  <div className='w-fit flex flex-col items-center justify-center'>
                    <div><img className='rounded-full w-16 h-16' src='/src/assets/user1chalogo.png' /></div>
                    <div className='text-sm py-1'>Leader Username</div>
                    <div className='flex flex-col text-xs'><span>Skill1</span><span>Skill2</span><span>Skill3</span><span>...</span></div>
                  </div>

                  <div className='w-fit flex flex-col'>
                    <div><img className='rounded-full w-12 h-12' src='/src/assets/user4chalogo.png' /></div>
                    <div className='text-sm py-1'>Username</div>
                    <div className='flex flex-col text-xs'><span>Skill1</span><span>Skill2</span><span>Skill3</span><span>...</span></div>
                  </div>
                </div>

                <div className='absolute -bottom-7 justify-center items-center right-0 flex flex-nowrap'>
          <img className='rounded-full absolute right-24 w-7 h-7 z-10' src='/src/assets/user2chalogo.png'/>
            <img className='rounded-full absolute  right-20 w-7 h-7 z-0' src='/src/assets/user3.png'/>
            <div className='text-xs'>2 more ...</div>
          </div>
              </div>

              

            </div>

          </div>
          <div className='flex absolute bottom-4 gap-4'>
            <div className={`text-base transition-all duration-1000 ease-in-out bg-black rounded-full px-12  py-2 my-3 hover:btn-grd ${hovered ? 'opacity-100' : ' opacity-0'} `}>VIEW</div>
            <div className={`text-base transition-all duration-1000 ease-in-out rounded-full px-12 py-1.5 my-3 btn-grd ${hovered ? 'opacity-100' : ' opacity-0'} `}>REQUEST</div>
          </div>

        </div>
      </div>


    </div>
  );
};

export default Card2;
