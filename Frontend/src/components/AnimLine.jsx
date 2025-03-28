import React from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';

const AnimLine = () => {
    useGSAP(()=>{
        gsap.from(".skill-line",{
            scaleX:0,
            duration:2,
        })
    })
    useGSAP(()=>{
        gsap.from(".decor-dot-red",{
            y:20,
            opacity:0,
            duration:0.5,
            delay:2,
            stagger:-0.2,
        })
    })
    useGSAP(()=>{
        gsap.from(".decor-dot-purple",{
            y:20,
            opacity:0,
            duration:0.5,
            delay:2,
            stagger:0.2,
        })
    })


    return(
        <div className='flex justify-center mb-2 mt-1 items-center'>
            <div className='decor-dot-red w-2 h-2 bg-red-900 rounded-lg mx-1'></div>
            <div className='decor-dot-red w-2 h-2 bg-red-800 rounded-lg mx-1'></div>
            <div className='decor-dot-red w-2 h-2 bg-red-700 rounded-lg mx-1'></div>
            <div className='decor-dot-red w-2 h-2 bg-red-600 rounded-lg mx-1'></div>
            <div
                className='skill-line max-w-md w-full h-0.5 bg-gradient-to-l from-purple-500 via-pink-500 to-red-500 mx-1'>
            </div>
            <div className='decor-dot-purple w-2 h-2 bg-purple-600 rounded-lg mx-1'></div>
            <div className='decor-dot-purple w-2 h-2 bg-purple-700 rounded-lg mx-1'></div>
            <div className='decor-dot-purple w-2 h-2 bg-purple-800 rounded-lg mx-1'></div>
            <div className='decor-dot-purple w-2 h-2 bg-purple-900 rounded-lg mx-1'></div>
        </div>
    )
}

export default AnimLine