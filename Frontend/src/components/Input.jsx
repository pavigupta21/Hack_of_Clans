import React from 'react'
import { Pencil, ShieldUser, Navigation } from 'lucide-react'


const Input = ({icon:Icon , ...props}) => {
  return (
    <div className='relative mb-6'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Icon className = 'size-5 text-purple-300'/>
        </div> 
        <input 
        {...props}
        className='w-full pl-10 pr-3 py-2 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-purple-500 text-white placeholder-gray-300 transition duration-200'
         />
    </div>
  )
}

export const StartupInput = ({...handler}) => {
  return (
   <div>

    <div className='relative'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <ShieldUser className='size-5 text-pink-500'/>
      </div>
      <input 
        type='password' placeholder='Password' {...handler}
        className='w-full pl-10 pr-3 py-2 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-purple-500 text-white placeholder-gray-300 transition duration-200'
        />
    </div>
      <p className='text-gray-400 font-mono font-thin'>
          *You are a google logged user hence you need to set up a password
      </p>
  </div>
  )
}

export const BioInput = ({...handler}) => {
  return (
    <div className='relative mb-6'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Pencil className = 'size-5 text-purple-300'/>
        </div> 
        <input 
        placeholder='Describe yourself in few words' {...handler}
        className='w-full h-20 pl-10 pr-3 py-2 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-purple-500 text-white placeholder-gray-300 transition duration-200'
         />
    </div>
  )
}

export const LinksInput = ({img, name, ...handler}) => {
  return (
    <div className='relative mb-6'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <img src={img} alt="img" className='size-6'/>
        </div> 
        <input 
        placeholder = {`Enter your ${name} link here`}
        {...handler}
        className='w-full pl-10 pr-3 py-2 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-purple-500 text-white placeholder-gray-300 transition duration-200'
         />
    </div>
  )
}


export default Input;