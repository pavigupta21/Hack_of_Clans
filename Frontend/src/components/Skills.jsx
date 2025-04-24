import React, {useState} from 'react';
import Skill from './Skill';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import  { motion } from 'framer-motion'
import { useClanStore } from '../store/clan.store';

const PrevArrow = ({ onClick , isMobile }) => (
  <motion.button 
    whileHover={{scale: 1.05}}
    whileTap={{scale:0.95}}
    className={`absolute left-[-40px] top-1/2 transform -translate-y-1/2 text-white w-6 h-6 rounded-md bg-purple-600 flex justify-center items-center ${isMobile ? "hidden" : ""}`}
    onClick={onClick}
  >
    <ChevronsLeft size={20}/>
  </motion.button>
);

const NextArrow = ({ onClick, isMobile }) => (
  <motion.button 
    whileHover={{scale: 1.05}}
    whileTap={{scale:0.95}}
    className={`absolute right-[-40px] top-1/2 transform -translate-y-1/2 text-white w-6 h-6 rounded-md bg-pink-600 flex justify-center items-center ${isMobile ? "hidden" : ""}`}
    onClick={onClick}
  >
    <ChevronsRight size={20} />
    </motion.button>
);


const skillnames = ["React","Node Js","Mongo DB","Tailwind","Postgres SQL", "My SQL", "Next Js", "HTML","CSS","Javascipt","Kubernetes","PyTorch","Tensor Flow","OpenCV","Java","C++","Python","Operating System", "AWS","Azure","Communication","Leadership","Problem Solving", "Presentation", "Github"];



const Skills = ({display, isMobile}) => {
  const settings = {
    dots: false,  
    infinite: true,
    speed: 1000,
    slidesToShow: display,
    slidesToScroll: display,
    autoplay: false,
    arrows: true, 
    prevArrow: <PrevArrow isMobile={isMobile}/>, 
    nextArrow: <NextArrow isMobile={isMobile}/>,
  };
  
  const { skills } = useClanStore();

  // const [skill_status, setSkill_status] = useState({skillname:null, level:0});

  // console.log("Yeh hai current skills : ",skills);

  const skillMap = new Map(); 

  for(let i = 0 ; i < skills.length ; i++){
    skillMap.set(skills[i].skillname, skills[i].level);
  }
  // console.log("skill map ", skillMap );

  useGSAP(()=>{
    gsap.from(".Skillload",{
      y:40,
      opacity:0,
      duration:2,
      stagger:0.1,
    })
  })

  return (
    <div className="relative w-full px-2">
      <Slider {...settings}>
      {skillnames.map((skill, index) => (
          <Skill key={index} skillname={skill} d = {index+1} className='Skillload' active1={skillMap.get(skill) || 0} level1={skillMap.get(skill) || 0} />
        ))}
      </Slider>
    </div>
  );
};

export default Skills;
