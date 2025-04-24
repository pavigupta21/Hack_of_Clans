import React, { useState , useRef } from 'react'
import { ImageUp, Navigation, X } from 'lucide-react'
import {motion } from 'framer-motion'
import { useClanStore } from '../store/clan.store';
import { useChatStore } from '../store/chat.store';

const MessageInput = () => {

    const [message, setMessage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const {user} = useClanStore();
    const {selectedTeam, sendMessage} = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
          toast.error("Please select an image file");
          return;
        }
    
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async() => {

        // console.log("running", message)
        if(message == "" && !imagePreview ) return ; 
        
        try {
            await sendMessage({
              userId: user._id,
              teamId: selectedTeam,
              text: message.trim(),
              image: imagePreview,
            });
      

            setMessage("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
          } catch (error) {
            console.error("Failed to send message:", error);
          }

    }

  return (
    <div className='w-full h-[10vh] bg-transparent backdrop-blur-2xl flex'>

        {imagePreview && (
            <div className="mb-3 flex items-center gap-2 absolute top-[78vh]">
            <div className="relative">
                <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                />
                <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-600
                flex items-center justify-center"
                type="button"
                >
                <X className="size-3" />
                </button>
            </div>
            </div>
        )}

        <div className='w-1/12 h-[10vh] flex justify-center items-center'>
            <input 
            type="file" 
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange} />

            <motion.button
                whileHover={{scale:1.05}}
                whileTap={{scale:0.95}}
                onClick={() => fileInputRef.current?.click()}
            >
                <ImageUp className='text-violet-600 size-7'/>
            </motion.button>
        </div>
        <div className='w-10/12 h-[10vh] '> 
            <div className='w-full h-[10vh] bg-transparent backdrop-blur-2xl flex items-center relative mb-6'>
            <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
            <motion.button
                whileHover={{scale:1.05}}
                whileTap={{scale:0.95}}
                onClick={handleSendMessage}
                >
                <Navigation className = 'size-5 text-purple-300'/>
                </motion.button>
            </div>
            <input 
                placeholder='Type message here'
                onChange={(e) => setMessage(e.target.value)}
                value = {message}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // prevents line breaks if textarea later
                    handleSendMessage();
                  }
                }}
                className='w-full h-[5vh] pl-3 pr-10 py-2 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-purple-500 text-white placeholder-gray-300 transition duration-200'
            />
            </div>
        </div>
    </div>
  )
}

export default MessageInput