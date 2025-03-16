import { useEffect } from "react";
import gsap from "gsap";

const AnimatedBox = () => {
  useEffect(() => {
    gsap.to(".box", { 
      y: 900, 
      duration : 10, 
      repeat : -1,
      // opacity: 0,
      ease: "linear",
     });

     gsap.to(".pattern", {
      opacity:0,
      duration:2,
      repeat:-1,
      yoyo: true,
     });
     
     gsap.to(".pattern1", {
      opacity:0,
      duration:2,
      repeat:-1,
      yoyo: true,
     });

     gsap.to(".pattern2", {
      opacity:0,
      duration:2,
      delay: 1,
      repeat:-1,
      yoyo: true,
     });

     gsap.to(".pattern3", {
      opacity:0,
      duration:2,
      delay:2,
      repeat:-1,
      yoyo: true,
     });

     gsap.to(".pattern4", {
      opacity:0,
      duration:2,
      repeat:-1,
      yoyo: true,
     });

     gsap.to(".pattern5", {
      opacity:0,
      duration:1,
      repeat:-1,
      yoyo: true,
     }); 

     gsap.to(".pattern6", {
      opacity:0,
      duration:4,
      delay:3,
      repeat:-1,
      yoyo: true,
     });
  });

  return (
    <>

      <div className="pattern w-20 h-20 bg-purple-700 rounded-lg absolute left-[25%] top-[10%] shadow-[0_0_10px_5px_rgba(168,50,247,1)]"></div>
      <div className="pattern1 w-60 h-60 bg-purple-700 rounded-lg absolute left-[15%] top-[40%] shadow-[0_0_10px_5px_rgba(168,50,247,1)]"></div>
      <div className="pattern2 w-10 h-10 bg-purple-700 rounded-lg absolute left-[65%] top-[60%] shadow-[0_0_10px_5px_rgba(168,50,247,1)]"></div>
      <div className="pattern3 w-50 h-50 bg-purple-700 rounded-lg absolute left-[75%] top-[30%] shadow-[0_0_10px_5px_rgba(168,50,247,1)]"></div>
      <div className="pattern4 w-60 h-60 bg-purple-700 rounded-lg absolute left-[35%] top-[80%] shadow-[0_0_10px_5px_rgba(168,50,247,1)]"></div>
      <div className="pattern5 w-30 h-30 bg-purple-700 rounded-lg absolute left-[55%] top-[80%] shadow-[0_0_10px_5px_rgba(168,50,247,1)]"></div>
      <div className="pattern6 w-45 h-45 bg-purple-700 rounded-lg absolute left-[85%] top-[30%] shadow-[0_0_10px_5px_rgba(168,50,247,1)]"></div>
      
      
      <div className={"box w-20 h-8 bg-purple-500 rounded-lg absolute left-[75px] top-[-120px] shadow-[0_0_10px_5px_rgba(168,85,247,0.8)] border-white border-2"}
      ></div>
      <div className={"box w-8 h-40 bg-purple-500 rounded-lg absolute left-[50px] top-[-175px] shadow-[0_0_10px_5px_rgba(168,85,247,0.8)]"}
      ></div>
      <div className={"box w-8 h-40 bg-purple-500 rounded-lg absolute left-[130px] top-[-175px] shadow-[0_0_10px_5px_rgba(168,85,247,0.8)]"}
      ></div>
      <div className={"box w-20 h-40 bg-purple-500 rounded-lg absolute left-[180px] top-[-175px] shadow-[0_0_10px_5px_rgba(168,85,247,0.8)]"}
      ></div>
      <div className={"box w-24 h-8 bg-purple-500 rounded-lg absolute left-[280px] top-[-175px] shadow-[0_0_10px_5px_rgba(168,85,247,0.8)]"}
      ></div>
      <div className={"box w-24 h-8 bg-purple-500 rounded-lg absolute left-[280px] top-[-45px] shadow-[0_0_10px_5px_rgba(168,85,247,0.8)]"}
      ></div>
      <div className={"box w-8 h-40 bg-purple-500 rounded-lg absolute left-[275px] top-[-173px] shadow-[0_0_10px_5px_rgba(168,85,247,0.8)]"}
      ></div>
      </>
  );
};

export default AnimatedBox;
