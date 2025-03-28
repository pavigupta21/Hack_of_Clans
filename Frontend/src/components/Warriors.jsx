import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'


const Warriors = () => {

    useGSAP(()=>{
        gsap.from(".barb", {
            y:100,
            duration:4,
            opacity:0,
        })
    })

  return (
    <div className='flex justify-between items-end w-screen h-screen'>
        <div className='barb w-[300px] h-[260px] translate-x-20'>
            <img src="./Pekka.png" alt="Pekka" />
        </div>
        <div className='barb w-[300px] h-[250px] -translate-x-20'> 
            <img src="./Barbarian.png" alt="Barbarian" />
        </div>
    </div>
  )
}

export default Warriors