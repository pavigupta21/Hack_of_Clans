import React, { useState } from 'react';

const Card = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className='p-8'>
      <div
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className={`relative flex flex-col justify-center items-center w-60 h-60 transition-all ease-in-out duration-800 overflow-hidden`} 
      >
        <div
          className={`absolute overflow-hidden inset-0 rounded-lg border-[1px] border-purple-400 transition ease-in-out duration-800 ${
            hovered ? 'bg-gradient-to-bl from-purple-400 to-transparent opacity-70' : 'bg-gradient-to-bl from-black to-slate-700  opacity-70'
          }`}
        ></div>

        <div className="relative opacity-50">
          <div className={`flex flex-col transition-all duration-700 ease-in-out  gap-4 h-fit w-32 rotate-[45deg] ${hovered ? 'translate-y-[30%]' : '-translate-y-[30%]'}`}>
            <div
              className={`w- h-[10px] transition-all duration-700 ease-in-out rounded-full bg-slate-500 ${
                hovered ? 'translate-x-[70%]' : '-translate-x-[100%]'
              }`}
            ></div>
            <div
              className={`w-14 h-[10px] transition-all duration-700 ease-in-out rounded-full bg-slate-500 ${
                hovered ? '-translate-x-[100%]' : 'translate-x-[100%]'
              }`}
            ></div>

            
            <div
              className={`w-28 h-[10px] transition-all duration-700 ease-in-out rounded-full bg-slate-500 ${
                hovered ? '-translate-x-[85%]' : 'translate-x-[100%]'
              }`}
            ></div>
            <div
              className={`w- h-[10px] transition-all duration-700 ease-in-out rounded-full bg-slate-500 ${
                hovered ? 'translate-x-[100%]' : '-translate-x-[100%]'
              }`}
            ></div>
          </div>
        </div>

        <div className="absolute z-5 text-3xl flex flex-col items-center justify-evenly text-center text-slate-400">
          Lorem Ipsum
          <div className='text-2xl transition-all duration-700 ease-in-out bg-black rounded-full px-4 py-2 hover:bg-gradient-to-r '>APPLY</div>
        </div>
      </div>

      <div
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className={`relative flex flex-col justify-center items-center w-60 h-60 transition-all ease-in-out duration-800 overflow-hidden`} 
      >
        <div
  className={`absolute overflow-hidden inset-0 rounded-lg border-[1px] border-purple-400 duration-500 ease-in [transition-property:_--color-a,_--color-b, _--color-c] ${
    hovered
      ? 'bg-gradient-to-bl to-[var(--color-a)] from-[var(--color-b)] opacity-70'
      : 'bg-gradient-to-bl from-[var(--color-a)] to-slate-600 opacity-50'
  }`}
  style={{
    '--color-c': hovered ? '#000000' : '#808080',
    '--color-a': hovered ? '#000000': '#000000' ,
  }}
></div>


        <div className="relative opacity-50">
          <div className={`flex flex-col transition-all duration-700 ease-in-out  gap-4 h-fit w-32 rotate-[90deg] ${hovered ? 'translate-y-[30%]' : '-translate-y-[30%]'}`}>
            <div
              className={` h-[50px] transition-all duration-700 ease-in-out rounded-full bg-slate-500 ${
                hovered ? 'translate-x-[70%]' : '-translate-x-[100%]'
              }`}
            ></div>
            <div
              className={`w-14 h-[30px] transition-all duration-700 ease-in-out rounded-full bg-slate-500 ${
                hovered ? '-translate-x-[100%]' : 'translate-x-[100%]'
              }`}
            ></div>

            
            <div
              className={`w-28 h-[10px] transition-all duration-700 ease-in-out rounded-full bg-slate-500 ${
                hovered ? '-translate-x-[85%]' : 'translate-x-[100%]'
              }`}
            ></div>
            <div
              className={`w- h-[10px] transition-all duration-700 ease-in-out rounded-full bg-slate-500 ${
                hovered ? 'translate-x-[100%]' : '-translate-x-[100%]'
              }`}
            ></div>
          </div>
        </div>

        <div className="absolute z-5 text-3xl flex justify-center text-center text-slate-400">
          Lorem Ipsum
        </div>
      </div>
    </div>
  );
};

export default Card;
