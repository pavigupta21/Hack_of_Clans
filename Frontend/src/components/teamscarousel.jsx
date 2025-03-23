import React, { useState } from "react";
import Card2 from "./Card2";
import teamsData from "./data/teams";

const TeamsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = teamsData.length;
  const visibleCards = 3.5;

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
    <div className="relative flex flex-col justify-center items-center h-[97vh]">
      <div className="absolute top-2 left-[5vw] text-xl py-2 font-thin text-white">
        TEAMS
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
          {teamsData.map((team) => (
            <div key={team.id} className="flex-shrink-0">
              <Card2
              teamid = {team.id}
                teamname={team.name}
                domain={team.domain}
                bio={team.projectDescription}
                members={team.teamMembers}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-3 items-center text-center">
          <button
            onClick={handlePrev}
            className={`transform -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded-full hover:bg-gray-900 ${
              currentIndex === 0 ? "hidden" : ""
            }`}
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className={`transform -translate-y-1/2 text-white px-3 py-1 rounded-full hover:bg-gray-900 ${
              currentIndex === totalCards - 3 ? "hidden" : "bg-gray-700"
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamsCarousel;
