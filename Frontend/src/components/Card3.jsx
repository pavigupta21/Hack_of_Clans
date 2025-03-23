import React, { useState, useMemo } from 'react';

const Card3 = ({ username, userid, mainskill, bio, whyme, skillslist }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const colors = ["bg-blue-400", "bg-purple-500", "bg-green-400", "bg-red-500"];

  // Assign fixed colors to skills when the component first mounts
  const skillColors = useMemo(() => {
    return skillslist.map((_, index) => colors[index % colors.length]);
  }, [skillslist]);


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

        <div className="absolute top-0 left-0  ">
          <div className={` flex flex-nowrap opacity-15  `}>
            <img
              className={`transition-all absolute duration-1000 ease-in-out rotate-180 ${hovered ? 'translate-y-[195px] -translate-x-[20px]' : '-translate-y-[130%] -translate-x-[15px]'
                }`}
              src="src/assets/polygon.png"
            ></img>
            <img
              className={`transition-all duration-700 ease-in-out ${hovered ? 'translate-x-[110px] -translate-y-[50px]' : 'translate-x-[130px] translate-y-[265px]'
                }`}
              src='src/assets/polygon.png'
            />
            <img
             className={`transition-all duration-1000 translate-y-[220px] rotate-180 scale-50 ease-in-out ${hovered ? 'translate-x-[140px] ' : 'translate-x 40px] '
                }`}
              src='src/assets/polygon.png'
            />
            <img
             className={`transition-all duration-1000 rotate-180 ease-in-out ${hovered ? 'translate-x-[140px] -translate-y-[50px]' : 'translate-x 40px] translate-y-[265px]'
                }`}
              src='src/assets/polygon.png'
            />




          </div>
        </div>

        <div className="absolute left-0 top-0 p-12 text-xl flex flex-col items-center justify-between text-center h-full overflow-hidden text-slate-200">
          <div>
            <div className='h-fit flex flex-row justify-start gap-16 pb-4 items-center '>
              <div className='h-24 w-24  bg-black bg-opacity-60 rounded-2xl'><img src={`/src/assets/user${userid}chalogo.png`} /></div>
              <div className='flex flex-col justify-center items-center'>
                <div className=' text-lg'>{username}</div>
                <div className='text-sm font-thin'> {mainskill}</div>
              </div>

            </div>

            <div className='relative flex '>
              <div className={` text-sm text-left my-4 transition-all duration-500 ease-in-out ${hovered ? 'opacity-0 translate-x-[5%]' : 'opacity-100'}`}>
                User Bio : {bio}
              </div>
              <div className={`absolute top-4 transition-all duration-700 ease-in-out bg-gray-400 rounded-3xl w-[85%] h-[190%]  ${hovered ? 'opacity-20 right-0 ' : 'right-[-100%] opacity-0'}`}></div>
              <div className={`absolute top-8 w-[70%]  h-fit left-16 flex flex-col justify-start items-start p-3 transition-all duration-700 ease-in-out  ${hovered ? 'opacity-100 right-0 ' : 'left-[130%] opacity-100'}`}>
                <div className='pb-5' >Why Me? </div>
                <div className='font-thin text-start pb-5 text-xs'>{whyme}</div>
              </div>
            </div>
            <div className={` text-lg text-center flex flex-col justify-center items-center my-4 transition-all duration-500 ease-in-out ${hovered ? 'opacity-0 ' : 'opacity-100'}`}>
              SKILLS
              <div className='flex mt-6 text-sm flex-row gap-2 justify-start items-center flex-wrap '>
                {skillslist.map((skill, index) => (
                  <div key={index} className='py-2 px-3 flex w-fit justify-center items-center gap-3 bg-gray-500 bg-opacity-50 rounded-s-full rounded-e-full'>
                    <div className={`w-2 h-2 rounded-full ${skillColors[index]}`}></div>
                    {skill}
                  </div>
                ))}
              </div>
            </div>

          </div>
          <div className='flex absolute bottom-4 gap-4'>
            <div className={`text-base transition-all duration-700 ease-in-out bg-black rounded-full px-12  py-2 my-3 hover:btn-grd ${hovered ? 'opacity-100' : ' opacity-0'} `}>VIEW</div>
            <div className={`text-base transition-all duration-700 ease-in-out rounded-full px-12 py-1.5 my-3 btn-grd ${hovered ? 'opacity-100' : ' opacity-0'} `}>INVITE</div>
          </div>

        </div>
      </div>


    </div>
  );
};

export default Card3;
