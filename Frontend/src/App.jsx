import React from 'react'
import {Navigate, Route, Routes, Router} from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import EmailVerification from './pages/EmailVerification';
import ForgotPassword from './pages/ForgotPassword';
import { useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import { useClanStore } from './store/clan.store';
import ResetPasswordPage from './pages/ResetPassword';
import AuthPages from './pages/AuthPages';
import Home from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import Lobby from './pages/Lobby';
import { Toaster } from "react-hot-toast";
import Explore from './pages/Explore';
import AllHackathons from './pages/AllHackathons';
import ProfilePage from './pages/ProfilePage';
import MyTeams from './myteams/MyTeams';
import AllUsers from './pages/AllUsers';

// rona aa raha haiiii : ((

const ProtectedRoute = ({children}) => {
  const { isAuthenticated, user } = useClanStore(); 
  // console.log("Yaha tak aa raha hai function !!" );

  if(!isAuthenticated){
    return <Navigate to = "/auth/login" replace /> 
  }

  if(!user.isVerified){
    return <Navigate to = "/auth/verify-email" replace /> 
  }

  return children ;
}

const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} = useClanStore(); 
  // console.log(isAuthenticated, " User : ", user);

  if(isAuthenticated && user.isVerified){
    return <Navigate to = "/" replace /> 
  }

  return children;
}

const App = () => {

  const {isCheckingAuth, checkAuth} = useClanStore(); 

  useEffect(() => {
    checkAuth()
  },[])

  if(isCheckingAuth) return <LoadingSpinner/>

  return (
    <>


      <Routes>

        {/* here there are auth routes */}

        <Route path="/auth" element={<AuthPages />}>

          <Route 
          path="login" 
          element={
            <GoogleOAuthProvider clientId='288469729735-1tcahrpk3hbcp3hbgq5290akpo4ruidb.apps.googleusercontent.com'>
              <RedirectAuthenticatedUser>
                  <Login />
              </RedirectAuthenticatedUser>
              </GoogleOAuthProvider>
            } />
          
          <Route 
          path="signup"
          element={
            <GoogleOAuthProvider clientId='288469729735-1tcahrpk3hbcp3hbgq5290akpo4ruidb.apps.googleusercontent.com'>
                <RedirectAuthenticatedUser>
                  <SignUp />
                </RedirectAuthenticatedUser>
              </GoogleOAuthProvider>
            } />
          
          <Route 
          path="verify-email" 
          element={
            <RedirectAuthenticatedUser>
              <EmailVerification />
          </RedirectAuthenticatedUser>} />
          
          <Route 
          path="forgot-password" 
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>} />

        </Route>

        {/* main pages routes yaha pr dalo 
        make sure tum issse wrap kro protected route main taki unauthorised log andar na guss sake */}

        <Route 
        path='/' 
        element= {
          <ProtectedRoute>
            <Navbar/>
            <Home/>
        </ProtectedRoute>} />

        <Route
        path = '/reset-password/:token'
        element = {
          <RedirectAuthenticatedUser>
            <ResetPasswordPage/>
          </RedirectAuthenticatedUser>
        }
        />

        <Route 
        path='/explore' 
        element= {
          <ProtectedRoute>
            <Navbar/>
            <Explore/>
        </ProtectedRoute>} />

        <Route 
        path='/explore/all-hackathons' 
        element= {
          <ProtectedRoute>
            <Navbar/>
            <AllHackathons/>
        </ProtectedRoute>} />

        <Route 
        path='/explore/all-users' 
        element= {
          <ProtectedRoute>
            <Navbar/>
            <AllUsers/>
        </ProtectedRoute>} />

        <Route 
        path='/myteams' 
        element= {
          <ProtectedRoute>
            <Navbar/>
            <MyTeams/>
        </ProtectedRoute>} />

        <Route 
        path='/lobby' 
        element= {
          <ProtectedRoute>
            <Navbar/>
            <Lobby/>
        </ProtectedRoute>} />

        <Route 
        path='/profile' 
        element= {
          <ProtectedRoute>
            <Navbar/>
            <ProfilePage/>
        </ProtectedRoute>} />


      </Routes>
      <Toaster />
    </>
  )
}

export default App; 
