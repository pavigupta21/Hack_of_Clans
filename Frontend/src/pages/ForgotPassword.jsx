import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {

    const [email, setEmail] = useState(""); 
    const [isSubmitted, setIsSubmitted] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();

    }
  return (
    <div
        className = 'max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
        <div
            className='p-8'
        >
            <h2
                className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-violet-500 text-transparent bg-clip-text'
            >
                Forgot Password
            </h2>

            {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                    <p
                        className='text-gray-300 mb-6 text-center'
                    >
                        Enter your email address and we will send you a link to reset your password
                    </p>
                    <Input
                     icon = {Mail}
                     type = 'email'
                     placeholder= 'Email Address'
                     value = {email}
                     onChange = {(e) => setEmail(e.target.value)}
                     required
                    />

                    <button
                        className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 
                        text-white font-bold rounded-lg shadow-lg hover:from-violet-600 hover:to-purple-900 
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                        focus:ring-offset-gray-900 transition duration-800 active:scale-95"
                        type="submit"
                        >
                        Reset Password
                    </button>
                </form>
            ) : (
                <div
                    className='text-center'
                >
                    <div
                       className='w-16 h-16 bg-violet-500 rounded-full flex items-center justify-center mx-auto mb-4' 
                    >   
                            <Mail className='h-8 w-8 text-white' /> 
                    </div>
                    <p className='text-gray-300 mb-6'>
							If an account exists for {email}, you will receive a password reset link shortly.
                    </p>
                </div>
                
            )}
        </div>
        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<Link to={"/login"} className='text-sm text-purple-400 hover:underline flex items-center'>
					<ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
				</Link>
        </div>
    </div>
  )
}

export default ForgotPassword