import { UserCircle, UserRoundPen, ShieldUser, Loader } from 'lucide-react';
import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Logo from '../assets/icons8-google.svg'
import PasswordStrength from '../components/PasswordStrength';
import { useClanStore } from '../store/clan.store';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

const SignUp = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate =useNavigate();
  useGSAP(()=>{
      gsap.from(".letter", {
          y: 40, 
          duration: 0.5,
          stagger: 0.1,
      })
  })

  const {signup, error, isLoading, googleLogin } = useClanStore(); 

  const googleResponse = async (res) => {
    try {
      if(res['code']){
        await googleLogin(res['code']);
        // console.log("User data is :", result);
        // console.log("User is ", user); 
        // const {email, name} = result.data.user ; 
        // const token = result.data.token;
        // console.log( "google user" ,result.data.user);
        // console.log(token);
      }
      // console.log(res);
    } catch (error) {
      console.log("Error getting googleResponse", error);
    }
  }

  const googel_Login = useGoogleLogin({
      onSuccess: googleResponse, 
      onError: googleResponse, 
      flow : 'auth-code', 
  })


  const handleSignup = async (e) => {
    e.preventDefault(); 

    try {
      await signup(email, password, username); 
      navigate("/auth/verify-email"); 
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
            <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <div className='p-5'>
      <div className='login font-bold mb-6 text-2xl text-center overflow-hidden '>
        <span className="letter inline-block text-purple-300">S</span>
        <span className="letter inline-block text-purple-300">I</span>
        <span className="letter inline-block text-purple-300">G</span>
        <span className="letter inline-block text-purple-300">N</span>
        <span className="letter inline-block text-purple-300">U</span>
        <span className="letter inline-block text-purple-300">P</span>
      </div>

      <form onSubmit={handleSignup}>

      <Input 
            icon = {UserCircle}
            type = 'text'
            placeholder = 'Username'
            value = {username} 
            onChange = {(e) => setUsername(e.target.value)}
          />

      <Input 
            icon = {UserRoundPen}
            type = 'email'
            placeholder = 'Email'
            value = {email} 
            onChange = {(e) => setEmail(e.target.value)}
          />

          <Input 
            icon = {ShieldUser}
            type = 'password'
            placeholder = 'Password'
            value = {password} 
            onChange = {(e) => setPassword(e.target.value)}
          />
        {error && <p className='text-purple-500 font-semibold mt-2'>{error}</p>}
          <PasswordStrength password={password} />

        <motion.button 
          className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 
      text-white font-bold rounded-lg shadow-lg hover:from-violet-600 hover:to-purple-900 
      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
      focus:ring-offset-gray-900 transition duration-800 active:scale-95"
          whileHover={{scale: 1.02}}
          whileTap={{scale:0.96}}
          type='submit'
          disabled = {isLoading}
          >
            {isLoading ? <Loader className='animate-spin mx-auto'/> : "Sign Up"}
          </motion.button>

      </form>
      </div>
      <div>
        <div className='partition max-w-sm w-full h-0.5 bg-gray-900 rounded-lg mt-4 ml-8'></div>
          <div className='flex justify-center'>
              <button onClick={googel_Login}>
                <img src={Logo} alt="Logo" className="w-16 h-16 mt-4 mb-4" /> 
              </button>
          </div>
      </div>

          <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
            <p className='text-sm text-gray-400'>Already have an account? {" "}
            <Link to={"/auth/login"} className='text-purple-400 hover:underline'>
          Login
          </Link>
              {/* redirect to signup page */}
            </p>
          </div>
    </div>
    </>
  )
}

export default SignUp