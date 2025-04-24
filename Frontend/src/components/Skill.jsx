import React, {useState} from 'react'
import { motion } from 'framer-motion';
import { useClanStore } from '../store/clan.store';

const Skill = ({skillname, d, className, active1, level1}) => { 

    const [active, setActive] = useState(active1);
    const [level, setLevel] = useState(level1);

    const { user, addskill, skills, removeskill } = useClanStore();
 
    const handleSkillButton = (n) => {
        if(active && level == n){
            setActive(0); 
            removeskill({skillname})
            // console.log(user);

        }
        else{
            removeskill({skillname}); 
            addskill({skillname, level:n});
            setLevel(n);
            setActive(1);
            // console.log(skills, {skillname, level:n})
        }
        
    }

  return (
    <motion.div 
        whileHover={{scale : 1.05}}
        className={`${className} max-w-40 rounded-lg ${active ? "border-b-2 border-green-400 hover:border-green-400 hover:border-t-2" : "border-purple-600 border-b-2 hover:border-purple-700 hover:border-t-2 "} m-1 `}>
        <div className='flex justify-center m-2'>
            <img src={`/assets/${d}.png`} alt={skillname} />
        </div>
        <div className={`font-mono text-center ${active ? "text-green-500" : "text-white"}`}>
            {skillname}
        </div>
        <div>

        <motion.button
            whileHover={{scale:1.05}}
            onClick={() => handleSkillButton(1)}
            className={`${(active && (level == 1)) ? "bg-gradient-to-br from-emerald-400 to-cyan-900" : "bg-gradient-to-br from-purple-500 to-pink-500"}  text-center font-mono rounded-lg px-4 m-1`}
        >
            Beginner
        </motion.button>
        </div>
        <div>

        <motion.button
            whileHover={{scale:1.05}}
            onClick={() => handleSkillButton(2)}
            className={`${(active && (level == 2))  ? "bg-gradient-to-br from-emerald-400 to-cyan-900" : "bg-gradient-to-br from-pink-500 to-violet-800"}  text-center font-mono rounded-lg px-4 m-1`}
        >
            Intermediate
        </motion.button>
        </div>
        <div>

        <motion.button
            whileHover={{scale:1.05}}
            onClick={() => handleSkillButton(3)}
            className={`${(active && (level == 3))  ? "bg-gradient-to-br from-emerald-400 to-cyan-900" : "bg-gradient-to-br from-violet-800 to-purple-500"} text-center font-mono rounded-lg px-4 m-1 `}
        >
            Advanced
        </motion.button>
        </div>


    </motion.div>
  )
}

export default Skill