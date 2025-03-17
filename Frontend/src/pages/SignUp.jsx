import { UserCircle, UserRoundPen, ShieldUser } from 'lucide-react';
import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import Input from '../components/Input';
import gsap from 'gsap';
import Logo from '../assets/icons8-google.svg'
import PasswordStrength from '../components/PasswordStrength';

const SignUp = () => {

  const [usename, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  useGSAP(()=>{
      gsap.from(".letter", {
          y: 40, 
          duration: 0.5,
          stagger: 0.1,
      })
  })

  const handleSignUp = async (e) => {
      e.preventDefault();
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

      <form onSubmit={handleSignUp}>

      <Input 
            icon = {UserCircle}
            type = 'text'
            placeholder = 'Username'
            value = {email} 
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

          <PasswordStrength password={password} />

        <button
      className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 
      text-white font-bold rounded-lg shadow-lg hover:from-violet-600 hover:to-purple-900 
      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
      focus:ring-offset-gray-900 transition duration-800 active:scale-95"
            type="submit"
        >
            Sign Up
        </button>

      </form>
      </div>
      <div>
        <div className='partition max-w-sm w-full h-0.5 bg-gray-900 rounded-lg mt-4 ml-8'></div>
        <div className='flex justify-center'>
        <img src={Logo} alt="Logo" className="w-16 h-16 mt-4 mb-4 cursor-pointer" /> 
        </div>
      </div>

          <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
            <p className='text-sm text-gray-400'>Already have an account? {" "}
              Login
              {/* redirect to signup page */}
            </p>
          </div>
    </div>
    </>
  )
}

export default SignUp