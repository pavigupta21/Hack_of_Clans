import React from 'react'
import Card3 from './Card3';
import { useState } from 'react';
import users from "./data/users"

const Usercarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Create an array of only Card3 components with users data
    const cards = users.map((user) => (
      <Card3
        username={user.username}
        userid = {user.id}
        mainskill={user.mainskill}
        bio={user.bio}
        whyme={user.whyme}
        skillslist={user.skillslist}
      />
    ));
    
    const totalCards = cards.length;
    const visibleCards = 3.5; // Number of cards to display at once
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex + visibleCards >= totalCards ? 0 : prevIndex + 1
      );
    };
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? totalCards - visibleCards : prevIndex - 1
      );
    };
  
    return (
      <div className='relative flex flex-col justify-center items-center h-[100vh]'>
          <div className='absolute top-0 left-[5vw] text-xl py-5 font-thin text-white '>
              USERS
          </div>
          <div className="w-[90vw] overflow-hidden flex flex-col justify-center">
        {/* Carousel Wrapper */}
        <div
          className="flex justify-between gap-8 w-[100%] transition-transform duration-500"
          style={{
            transform: `translateX(-${(currentIndex / visibleCards) * 100}%)`,
            width: `${(totalCards / visibleCards) * 100}%`,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0"
            >
              {card}
            </div>
          ))}
        </div>
  
          <div className='flex justify-end gap-3'>
          <button
          onClick={handlePrev}
          className=" transform -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded-full hover:bg-gray-900"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="transform -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded-full hover:bg-gray-900"
        >
          &gt;
        </button>
          </div>
        {/* Navigation Buttons */}
        
      </div>
      </div>
      
    );
}

export default Usercarousel