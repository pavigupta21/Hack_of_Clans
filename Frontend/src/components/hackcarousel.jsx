import React, { useState } from 'react';
import Card1 from './Card1';

const HackCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [<Card1 />, <Card1 />, <Card1 />, <Card1 />]; // Array of cards
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
    <div className='mt-20 relative flex flex-col justify-center items-center h-[100vh]'>
        <div className='absolute top-0 left-[5vw] text-xl py-5 font-thin text-white '>
            HACKATHONS
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
};

export default HackCarousel;
