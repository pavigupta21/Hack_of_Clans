import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import {UserRoundPen, ShieldUser} from 'lucide-react';
import Input from '../components/Input'; 
import gsap from 'gsap';

const Login = () => {

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");

    useGSAP(()=>{
        gsap.from(".letter", {
            y: 40, 
            duration: 0.5,
            stagger: 0.1,
        })
    })

    const handleLogin = async (e) => {
        e.preventDefault();
      }

  return (
    <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-5'>
      <div className='login font-bold mb-6 text-2xl text-center overflow-hidden '>
        <span className="letter inline-block text-purple-300">L</span>
        <span className="letter inline-block text-purple-300">O</span>
        <span className="letter inline-block text-purple-300">G</span>
        <span className="letter inline-block text-purple-300">I</span>
        <span className="letter inline-block text-purple-300">N</span>
      </div>

      <form onSubmit={handleLogin}>
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

        <div className="flex items-center mb-6">
            <a href="/forgot-password" className="text-sm text-purple-400 hover:underline">
            Forgot Password
            </a>
        </div>

        <button
      className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 
      text-white font-bold rounded-lg shadow-lg hover:from-violet-600 hover:to-purple-900 
      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
      focus:ring-offset-gray-900 transition duration-200 active:scale-95"
            type="submit"
        >
            Login
        {/* {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"} */}
        </button>

      </form>
    </div>
  );
};

export default Login;

