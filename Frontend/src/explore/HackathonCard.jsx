import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Users } from 'lucide-react';

const HackathonCard = ({ name, link, m }) => {
  const [hovered, setHovered] = useState(false);
  const lineRef = useRef(null);

  const handleMouseOver = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  useEffect(() => {
    if (hovered) {
      gsap.to(lineRef.current, {
        width: "100%",
        duration: 0.6,
        ease: "linear",
      });
    } else {
      gsap.to(lineRef.current, {
        width: "0%",
        duration: 0.6,
        ease: "linear",
      });
    }
  }, [hovered]);

  const renderTags = (m) => (
    <>
      {m.tags?.map((ele, i) => (
        <div key={i} className="text-white h-fit w-fit font-poppins font-medium text-xs p-2 border rounded-3xl border-violet-600">
          {ele}
        </div>
      ))}
    </>
  );

  return (
    <motion.div
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={`relative w-[300px] h-[400px] rounded-xl m-4 flex-shrink-0 
      ${!hovered ? "bg-gradient-to-tr from-black via-gray-950 to-purple-900 border border-purple-800" : "bg-gradient-to-bl from-black via-gray-950 to-cyan-500 border border-cyan-400"} 
      transition duration-700 overflow-hidden border border-purple-900`}
    >
      <motion.div
        initial={{ x: 100, y: 100, rotate: 45 }}
        animate={hovered ? { x: 50, y: 50, rotate: 45 } : { x: 100, y: 100, rotate: 45 }}
        transition={{ duration: 0.4 }}
        className="bg-white opacity-15 rounded-lg w-[100px] h-[10px] absolute"
      />
      <motion.div
        initial={{ x: 70, y: 90, rotate: 45 }}
        animate={hovered ? { x: 90, y: 110, rotate: 45 } : { x: 70, y: 90, rotate: 45 }}
        transition={{ duration: 0.3 }}
        className="bg-white opacity-15 rounded-lg w-[180px] h-[10px] absolute"
      />
      <motion.div
        initial={{ x: 30, y: 190, rotate: 45 }}
        animate={hovered ? { x: 50, y: 210, rotate: 45 } : { x: 30, y: 190, rotate: 45 }}
        transition={{ duration: 0.7 }}
        className="bg-white opacity-10 rounded-lg w-[120px] h-[10px] absolute"
      />
      <motion.div
        initial={{ x: 50, y: 60, rotate: 45 }}
        animate={hovered ? { x: 150, y: 160, rotate: 45 } : { x: 50, y: 60, rotate: 45 }}
        transition={{ duration: 0.5 }}
        className={`${!hovered ? "bg-white opacity-25" : "bg-cyan-200 opacity-60"} rounded-lg w-[40px] h-[10px] absolute`}
      />
      <motion.div
        initial={{ x: 100, y: 180, rotate: 45 }}
        animate={hovered ? { x: 80, y: 160, rotate: 45 } : { x: 100, y: 180, rotate: 45 }}
        transition={{ duration: 0.5 }}
        className="bg-white opacity-15 rounded-lg w-[140px] h-[10px] absolute"
      />
      <motion.div
        initial={{ x: 165, y: 240, rotate: 45 }}
        animate={hovered ? { x: 25, y: 100, rotate: 45 } : { x: 165, y: 240, rotate: 45 }}
        transition={{ duration: 0.6 }}
        className="bg-white opacity-25 rounded-lg w-[40px] h-[10px] absolute"
      />

      <div className='font-black-ops font-medium text-gray-300 pt-4 pb-2 mt-4'>
        <h2 className={`text-center ${hovered ? "bg-gradient-to-r from-cyan-400 via-violet-500 to-violet-300 bg-clip-text text-transparent" : "text-gray-300"}`}>
          {name}
        </h2>
      </div>
      <div className='font-black-ops text-sm mb-2'>
        <h3 className={`text-center ${hovered ? "bg-gradient-to-r from-cyan-400 via-violet-500 to-violet-300 bg-clip-text text-transparent" : "text-gray-400"}`}>
          {m.sub_headline}
        </h3>
      </div>

      <div className='flex justify-center bg-transparent'>
        <div ref={lineRef} className='hackcardline max-w-40 rounded-lg h-0.5 w-0 bg-gradient-to-r from-purple-800 via-fuchsia-700 to-cyan-800' />
      </div>

      <div className='flex justify-evenly items-center mt-2'>
        <div className={`${hovered ? "text-cyan-600 border-cyan-700" : "text-gray-300 border-purple-800"} font-poppins font-medium text-sm p-2 border rounded-3xl `}>
          {m.mode}
        </div>
        <div className={`${hovered ? "text-cyan-600 border-cyan-700" : "text-gray-300 border-purple-800"} font-poppins font-medium text-sm p-2 border rounded-3xl `}>
          {m.dates}
        </div>
      </div>

      <div className='tags w-full h-2/6 flex flex-wrap justify-evenly mt-2'>
        {renderTags(m)}
      </div>

      <div className='flex flex-row w-full absolute bottom-16 px-4'>
        {m.status !== "" && (
          <div className='px-2 bg-gray-900 text-center rounded-2xl text-green-600 font-mono'>
            {m.status}
          </div>
        )}
        <div className='w-16 bg-gray-900 ml-4 text-center rounded-2xl text-fuchsia-700 flex font-mono'>
          <Users className='size-4 mt-1 ml-2 mr-2' />
          {m.no_of_participant}
        </div>
      </div>

      <div className='flex justify-center'>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute max-w-40 w-full bottom-1 flex justify-center items-center rounded-3xl text-gray-300 font-poppins font-medium text-sm p-2"
        >
        <motion.div
          animate={
            hovered
              ? { backgroundColor: "#1d0340", borderWidth: 2, borderColor: "#8b5cf6" }
              : { backgroundColor: "#000000", borderWidth: 2, borderColor: "#000000" }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='absolute max-w-40 w-full bottom-4 flex justify-center items-center rounded-3xl text-gray-300 font-poppins font-medium text-sm p-2'
        >
            Apply
        </motion.div>
          </a>
      </div>
    </motion.div>
  );
};

export default HackathonCard;
