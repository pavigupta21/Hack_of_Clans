import React from 'react'
import AnimatedBox from '../components/AnimaterBox';
import {Navigate, Route, Routes, Outlet} from "react-router-dom";

import { useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useClanStore } from '../store/clan.store.js';



// const ProtectedRoute = ({children}) => {
//     const { isAuthenticated, user } = useClanStore(); 
  
//     if(!isAuthenticated){
//       return <Navigate to = "/login" replace /> 
//     }
  
//     if(!user.isVerified){
//       return <Navigate to = "/verify-email" replace /> 
//     }
  
//     return children ;
//   }
  
//   const RedirectAuthenticatedUser = ({children}) => {
//     const {isAuthenticated, user} = useClanStore(); 
  
//     if(isAuthenticated && user.isVerified){
//       return <Navigate to = "/" replace /> 
//     }
  
//     return children;
//   }


const AuthPages = () => {

    // const {isCheckingAuth, checkAuth} = useClanStore();

    // useEffect(() => {
    //     checkAuth()
    //   },[checkAuth])
    
    //   if(isCheckingAuth) return <LoadingSpinner/>

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-purple-700 text-white relative flex justify-center items-center overflow-hidden">
        <AnimatedBox />
        <Outlet /> {/* Renders nested routes */}
    </div>
  )
}

export default AuthPages