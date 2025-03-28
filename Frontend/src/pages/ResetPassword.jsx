import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {motion} from 'framer-motion';
import Input from '../components/Input';
import { Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useClanStore } from '../store/clan.store';
import AnimatedBox from '../components/AnimaterBox';


const ResetPasswordPage = () => {
    
    const [password, setPassword] = useState("");
    const [newpassword, setNewPassoword] = useState(""); 

    const {resetPassword, error, isLoading, message} = useClanStore(); 

    const {token} = useParams();
    const navigate = useNavigate(); 

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        if(password != newpassword){
            alert("Password does not match");
            return ;
        }
        try {
            await resetPassword(token, password); 
            
            toast.success("Password reset was successful !")
            setTimeout(() => {
                navigate("/auth/login"); 
            }, 2000);
            
        } catch (error) {
            console.log('called handel submit');
            console.log(error);
            toast.error(error.message || "Error setting new password");
        }
    }

    return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-purple-700 text-white relative flex justify-center items-center overflow-hidden">
            <AnimatedBox />
    <motion.div
        initial = {{opacity: 0, y:20}}
        animate = {{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
        <div className='p-8'> 
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-violet-400 to-purple-500 text-transparent bg-clip-text'>
                Reset Password 
            </h2>
            {error && <p className='text-red-600 text-sm mb-4'>{error}</p>}
            {message && <p className='text-red-600 text-sm mb-4'>{message}</p>}

            <form onSubmit={handleSubmit}>
                <Input
                    icon = {Lock}
                    type = 'password'
                    placeholder = "New Password"
                    value = {password}
                    onChange= {(e) => (setPassword(e.target.value))}
                    required
                />
                <Input
                    icon = {Lock}
                    type = 'password'
                    placeholder = "Confirm New Password"
                    value = {newpassword}
                    onChange= {(e) => (setNewPassoword(e.target.value))}
                    required
                />
                <motion.button
                    whileHover={{scale: 1.05}}
                    whileTap ={{scale: 0.95}}
                    className='w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold rounded-lg shadow-lg hover:from-violet-600 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                    type = 'submit'
                    disabled = {isLoading}
                >
                    {isLoading ? "Resetting..." : "Set New Password"}
                </motion.button>
            </form>

        </div>

    </motion.div>
            
        </div>
  )
}

export default ResetPasswordPage