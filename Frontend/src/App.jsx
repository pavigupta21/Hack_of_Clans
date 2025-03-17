import React from 'react'
import AnimatedBox from './components/AnimaterBox';
import Login from './pages/Login';
import {Navigate, Route, Routes} from "react-router-dom";
import SignUp from './pages/SignUp';
import EmailVerification from './pages/EmailVerification';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  return (
    <>
        <div className='w-full h-screen bg-gradient-to-br from-gray-900 to-purple-700 text-white relative flex justify-center items-center overflow-hidden'>
          <AnimatedBox />
          

          <Routes>
            <Route path='/login' element = {<Login/>}/>
            <Route path = '/SignUp' element = {<SignUp/>}/>
            <Route path = '/Verify-email' element = {<EmailVerification/>} />
            <Route path ='/forgot-password' element = {<ForgotPassword/>}/>
          </Routes>
        </div> 
    </>
  )
}

export default App; 
