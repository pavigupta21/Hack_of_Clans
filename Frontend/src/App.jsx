import React from 'react'
import AnimatedBox from './components/AnimaterBox';
import Login from './pages/Login';

const App = () => {
  return (
    <div className='w-full h-screen bg-gradient-to-br from-gray-900 to-purple-700 text-white relative flex justify-center items-center overflow-hidden'>
      <AnimatedBox />
      <Login/>
    </div> 

  )
}

export default App; 
