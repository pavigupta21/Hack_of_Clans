import React, { useEffect, useState } from 'react'
import HackathonCard from './HackathonCard'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import gsap from 'gsap';
import  { motion } from 'framer-motion'
import { useExploreStore } from '../store/explore.store';

const PrevArrow = ({ onClick }) => (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="absolute left-1/3 -bottom-8 transform text-white w-8 h-8 rounded-md bg-purple-600 flex justify-center items-center z-10"
      onClick={onClick}
    >
      <ChevronsLeft size={20} />
    </motion.button>
  );
  
  const NextArrow = ({ onClick }) => (
    <motion.button 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="absolute right-1/3 -bottom-8 transform text-white w-8 h-8 rounded-md bg-pink-600 flex justify-center items-center z-10"
      onClick={onClick}
    >
      <ChevronsRight size={20} />
    </motion.button>
  );
  

const HackathonCarousel = () => {

  const {getHackathons, hackathons} = useExploreStore();

  useEffect(() => {
    getHackathons();
  },[])


  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4.5,
    slidesToScroll: 3,
    autoplay: false,
    arrows: true,
    centerMode: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
    // console.log(hackathons);
      

  return (
      <div className="w-full max-w-full mx-4 px-4 relative bg-transparent z-30">
        <Slider {...settings}>
          {/* <HackathonCard />
          <HackathonCard />
          <HackathonCard />
          <HackathonCard />
          <HackathonCard />
          <HackathonCard /> */}
          {hackathons.top15teams?.map((m, i) => (
            <HackathonCard key={m._id} name={m.headline} link = {m.url} m = {m} />
          ))}
        </Slider>
      </div>
  )
}

export default HackathonCarousel