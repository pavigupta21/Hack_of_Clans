import React from 'react'
import {Check, X} from 'lucide-react'

const PasswordCriteria = ({password}) =>{
    const criteria = [
        {label: "At least 6 characters", met: password.length >= 6},
        {label: "Constains uppercase", met: /[A-Z]/.test(password)},
        {label: "Constains lowercase", met: /[a-z]/.test(password)},
        {label: "Constains number", met: /\d/.test(password)},
        {label: "Constains special character", met: /[^A-Za-z0-9]/.test(password)},
    ];

    return (
        <div className='mt-2 space-y-1'>
            {criteria.map((item) => (
                <div key = {item.label} className='flex item-center text-xs'>
                    {item.met ? (
                        <Check className = 'size-4 text-purple-500 mr-2'/>
                     ) :( <X className = 'size-4 text-gray-600 mr-2'/>
                    )}
                    <span className={item.met ? "text-purple-500" : "text-gray-500"}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    )
}

const PasswordStrength = ({password}) => {

    const getStrength = (pass) => {
        let strength = 0 ; 
        if(pass.length >= 6) strength++ ;
        if(pass.match(/[a-z]/)&&pass.match(/[A-z]/)) strength++ ; 
        if(pass.match(/[\d]/)) strength++ ;
        if(pass.match(/[^a-zA-Z\d]/))strength++ ; 
        return strength; 
    }; 

    const strength = getStrength(password); 

    const getcolor = (strength) => {
        if(strength === 0 ) return "bg-red-500";
        if(strength === 1 ) return "bg-red-400";
        if(strength === 2 ) return "bg-purple-200";
        if(strength === 3 ) return "bg-purple-400"; 
        return "bg-purple-700";  
    }

    const getStrengthText = (strength) => {
        if(strength === 0 ) return "Very Weak";
        if(strength === 1 ) return "Weak";
        if(strength === 2 ) return "Fair";
        if(strength === 3 ) return "Good"; 
        return "Strong"; 
    }

  return (
    <div className='mt-2'>
        <div className='flex justify-between items-center mb-1'>
            <span className='text-xs text-gray-400'>Password Strength</span>
            <span className='text-xs text-gray-400'>{getStrengthText(strength)}</span>
        </div>

        <div className='flex space-x-1'>
            {[...Array(4)].map((_,index) => (
                <div 
                    key = {index}
                    className = {`h-1 w-1/4 rounded-full transition-colors duration-300 
                    ${index < strength ? getcolor(strength): 'bg-gray-600'}`}
                />
            ))}
        </div>
        <PasswordCriteria password = {password}/>
    </div>
  )
}

export default PasswordStrength