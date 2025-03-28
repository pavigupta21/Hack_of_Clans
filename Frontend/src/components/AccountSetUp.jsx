import React, { useEffect, useState } from 'react'
import Skills from './Skills'
import PersonalInfo from './PersonalInfo'
import PersonalLinks from './PersonalLinks'
import { StepForward, StepBack } from 'lucide-react'

import AnimLine from './AnimLine'


const AccDivs = ({num}) => { 
    
    if(num == 1){
        return(
            <div className='skills flex justify-center items-center'>
            <div className='skills max-w-2xl w-full rounded-lg'>
                    <span className='font-mono text-pink-400 font-semibold text-lg text-left'>
                        Skills
                    </span>
                    <div>
                        <AnimLine/>
                        <Skills/>
                    </div>
            </div>
        </div>
        )
    }
    if(num == 2){
        return (
            <div className='personal_info flex justify-center'>
            <div className='max-w-lg w-full rounded-lg' >
                <span className='font-mono text-purple-400 font-semibold text-lg text-left'>
                        Personal Information 
                </span>
                    <AnimLine/>
                    <PersonalInfo/>
            </div>
        </div>
        )
    }
    if(num == 3){
        return (
            <div className='personal_links flex justify-center'>
                <div className='max-w-lg w-full rounded-lg'>
                    <span className='font-mono text-blue-600 font-semibold text-lg text-left'>
                            Personal Links
                    </span>
                    <AnimLine/>
                    <PersonalLinks/>
                </div>
            </div>
        )
    }

}


const AccountSetUp = () => { 
    
    const [currPage, setCurrPage] = useState(1);
    
    const handleButton = (n) => {
        console.log("Before clicking", currPage);
        setCurrPage(n);  
        console.log("After clicking", currPage);
    }
    
    const handleBack = () => {
        setCurrPage(currPage-1);
    }
    const handleFront = () => {
        setCurrPage(currPage+1);
    }
    
    return (
        <div className='text-white'> 

        <AccDivs num = {currPage}/>

        <div className='flex justify-center mt-8 mb-4'>
            <div className='controllers max-w-md w-full flex justify-between items-center'>
                <div>
                    <button onClick= {() => handleBack()} disabled = {currPage == 1}>
                        <StepBack className='text-purple-400'/>
                    </button>
                </div>
                <div>
                    <button onClick = {() =>handleButton(1)} className={`rounded-lg ${currPage == 1 ? "bg-purple-600" : "bg-blue-950 text-purple-400"} m-1 p-2 hover:bg-gradient-to-r from-purple-800 to-pink-500 transition duration-1000 hover:text-white font-mono`}>Skills</button>
                    <button onClick = {() =>handleButton(2)} className={`rounded-lg ${currPage == 2 ? "bg-purple-600" : "bg-blue-950 text-pink-600"} m-1 p-2 hover:bg-gradient-to-r from-purple-800 to-pink-500 transition duration-1000 hover:text-white font-mono`}>Info</button>
                    <button onClick = {() =>handleButton(3)} className={`rounded-lg ${currPage == 3 ? "bg-purple-600" : "bg-blue-950 text-violet-500"} m-1 p-2 hover:bg-gradient-to-r from-purple-800 to-pink-500 transition duration-1000 hover:text-white font-mono`}>Links</button>
                </div>
                <div>
                    <button onClick= {() => handleFront()} disabled = {currPage == 3}>
                        <StepForward className='text-cyan-500'/>
                    </button>
                </div> 
            </div>
        </div>
    </div>

  )
}

export default AccountSetUp