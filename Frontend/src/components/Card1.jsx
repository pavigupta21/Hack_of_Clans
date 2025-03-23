import React, { useState } from 'react';

const Card1 = () => {
  const [hovered, setHovered] = useState(false);

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
          className={`absolute inset-0 rounded-3xl border-[1px] border-purple-400 transition ease-in-out duration-800 ${
            hovered ? 'bg-gradient-to-bl from-[#800080] via-transparent to-transparent opacity-70' : 'bg-gradient-to-bl from-black via-black to-slate-500  opacity-70'
          }`}
        ></div>

        <div className="relative opacity-50">
          <div className={`flex flex-col transition-all justify-between duration-700 ease-in-out  gap-4 h-[fit] w-32 rotate-[45deg] ${hovered ? 'translate-y-[30%]' : '-translate-y-[30%]'}`}>
            <div
              className={` h-[15px] transition-all duration-1000 ease-in-out rounded-full bg-slate-500 ${
                hovered ? '-translate-x-[100%]': 'translate-x-[50%]' 
              }`}
            ></div>
            <div
              className={`w-80 h-[15px] transition-all duration-1000 ease-in-out rounded-full bg-slate-500 ${
                hovered ? '' : '-translate-x-[35%]'
              }`}
            ></div>

            <div className='flex flex-row '>
            <div
              className={`w-8 h-[15px] transition-all duration-700 ease-in-out rounded-full bg-slate-500 ${
                hovered ? '-translate-x-[85%]' : 'translate-x-[100%]'
              }`}
            ></div>
            <div
              className={`w-24  h-[15px] transition-all duration-700 ease-in-out rounded-full bg-slate-500 ${
                hovered ? 'translate-x-[100%]' : '-translate-x-[100%]'
              }`}
            ></div>

            </div>

            
            <div
              className={`w-28 h-[15px] transition-all duration-700 ease-in-out rounded-full bg-slate-500 ${
                hovered ? '-translate-x-[85%]' : 'translate-x-[100%]'
              }`}
            ></div>
            <div
              className={` h-[15px] transition-all duration-700 ease-in-out rounded-full bg-slate-500 ${
                hovered ? 'translate-x-[100%]' : '-translate-x-[100%]'
              }`}
            ></div>
          </div>
        </div>

        <div className="absolute left-0 top-0 p-12 text-xl flex flex-col items-center justify-between text-center h-full overflow-hidden text-slate-200">
          <div>
            <div className='h-fit flex flex-row justify-between pb-4 items-center '>
                <div className='h-20 w-20 p-3 bg-black bg-opacity-60 rounded-2xl'><img  src="src\assets\Vector.png"/></div>
                <div className=' text-base'>HACKATHON NAME</div>
            </div>

            <div className='text-sm text-left my-4'>
            HACKATHON DISCRIPTION : Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  
            </div>
            
            </div>
          <div className={`text-lg transition-all duration-700 ease-in-out bg-slate-700 rounded-full px-7 py-1.5 my-3 hover:btn-grd ${hovered? 'opacity-100':' opacity-0'} `}>APPLY</div>
        </div>
      </div>

      
    </div>
  );
};

export default Card1;
