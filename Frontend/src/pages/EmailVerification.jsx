import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClanStore } from '../store/clan.store';

const EmailVerification = () => {


    const {error, isLoading, verifyEmail} = useClanStore();

    const [code, setCode] = useState(["", "", "", "", "", ""]); 
    const inputRefs = useRef([]); 
    const navigate = useNavigate(); 

    const handleChange = (index, value) => {
        const newCode = [...code] 

        if(value.length > 1) {
            const pastedCode = value.slice(0, 6).slice("");
            for(let i = 0 ; i < 6 ; i ++){
                newCode[i] = pastedCode[i] || "" ; 
            }
            setCode(newCode); 

            const lastfilledIndex = newCode.findLastIndex((digit) => digit !== ""); 
            const focusIndex = lastfilledIndex < 5 ? lastfilledIndex + 1 : 5; 
            inputRefs.current[focusIndex].focus ; 
        }
        else {
            newCode[index] = value; 
            setCode(newCode); 

            if(value && index < 5){
                inputRefs.current[index + 1].focus(); 
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if(e.key === "Backspace" && !code[index] && index > 0){
            inputRefs.current[index-1].focus(); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verifcationCode = code.join(""); 
        try {
            await verifyEmail(verifcationCode); 
            navigate("/");  
        } catch (error) {
            console.log(error); 
        }
    }

    //we need to auto submit if all 6 digits are entered 
    useEffect (() => {
        if(code.every(digit => digit !== '')){
            handleSubmit(new Event('submit'));
        }
    },[code])
    return (
        <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>

            <div
                className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
            >
                <h2
                    className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-violet-500 text-transparent bg-clip-text'>
					Verify Your Email
                </h2>
                <p
                    className='text-center text-gray-300 mb-6'
                >
                    Enter the 6 Digit code sent to your email
                </p>
                <form
                    className='space-y-6' 
                    onSubmit={handleSubmit}
                >
                    <div
                        className='flex justify-between'
                    >
                        {code.map((digit, index) => (
                        <input
                            key = {index}
                            ref = {(eL) => (inputRefs.current[index] = eL)}
                            type='text'
                            maxLength='6'
                            value={digit}
                            onChange = {(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className= 'w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-violet-500 focus:outline-none'
                        />
                    ))}
                    </div>

                    {/* {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>} */}
                <button
                    className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 
                    text-white font-bold rounded-lg shadow-lg hover:from-violet-600 hover:to-purple-900 
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                    focus:ring-offset-gray-900 transition duration-800 active:scale-95"
                    type="submit"
                >
                    Verify
                </button>

                </form>
            </div>
        </div>
    )
}

export default EmailVerification 