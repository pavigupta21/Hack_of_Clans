import React from 'react'
import { motion } from 'framer-motion'

const BgAnim = () => {
  return (
    <div className='min-h-screen flex w-full bg-black'>
      {/* Column 1 simple basic hai bas upaar jaaa raha haiii  */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: -400 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-br-full bg-gradient-to-t from-purple-600 via-fuchsia-500 to-transparent'
        />
      </div>

      {/* Column 2  thoda tweak kiya hai bsss */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -400 }}
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-tr-full bg-gradient-to-b from-blue-800 via-cyan-500 to-transparent'
        />
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -1100 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: 5 // Stagger the animations
          }}
          className='absolute w-full h-[1100px] rounded-tl-full bg-gradient-to-b from-blue-800 via-cyan-500 to-transparent mt-40'
        />
      </div>

      {/* Column 3 bhaii sir ko kya dikhayaengeeee do din mein dikhanaa haiii : ((( */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: -400 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-bl-full bg-gradient-to-t from-purple-600 via-fuchsia-500 to-transparent'
        />
      </div>

      {/* Column 4 koi ni kr lengeee */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      {/* Column 5 haa krna toh padeegaa hiiii */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: -400 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-br-full bg-gradient-to-t from-purple-600 via-fuchsia-500 to-transparent'
        />
      </div>

      {/* Column 6 */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -400 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-tr-full bg-gradient-to-b from-purple-600 via-fuchsia-500 to-transparent'
        />

        <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        </div>

        <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        </div>

        <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        </div>
        
        <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        </div>

        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -1100 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: 5 // Stagger the animations
          }}
          className='absolute w-full h-[1100px] rounded-tl-full bg-gradient-to-b from-blue-800 via-cyan-500 to-transparent mt-40'
        />
      </div>

      {/* Column 7 */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -400 }}
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-tl-full bg-gradient-to-b from-blue-800 via-cyan-500 to-transparent'
        />
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -1100 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: 5 // Stagger the animations
          }}
          className='absolute w-full h-[1100px] rounded-tr-full bg-gradient-to-b from-blue-800 via-cyan-500 to-transparent mt-40'
        />
      </div>

      {/* Column 8 */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      {/* Column 9 */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: -400 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-bl-full bg-gradient-to-t from-purple-600 via-fuchsia-500 to-transparent'
        />
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      {/* Cloumn 10 */ }
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: -400 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-bl-full bg-gradient-to-t from-purple-600 via-fuchsia-500 to-transparent'
        />
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: -400 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-br-full bg-gradient-to-t from-purple-600 via-fuchsia-500 to-transparent'
        />
      </div>

      {/* Column 2  thoda tweak kiya hai bsss */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -400 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-tr-full bg-gradient-to-b from-blue-800 via-cyan-500 to-transparent'
        />
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -1100 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: 5 // Stagger the animations
          }}
          className='absolute w-full h-[1100px] rounded-tl-full bg-gradient-to-b from-blue-800 via-cyan-500 to-transparent mt-40'
        />
      </div>

      {/* Column 3 bhaii sir ko kya dikhayaengeeee do din mein dikhanaa haiii : ((( */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: -400 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-bl-full bg-gradient-to-t from-purple-600 via-fuchsia-500 to-transparent'
        />
      </div>

      {/* Column 4 koi ni kr lengeee */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      {/* Column 5 haa krna toh padeegaa hiiii */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: -400 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-br-full bg-gradient-to-t from-purple-600 via-fuchsia-500 to-transparent'
        />
      </div>

      {/* Column 6 */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -400 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-tr-full bg-gradient-to-b from-purple-600 via-fuchsia-500 to-transparent'
        />
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -1100 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: 5 // Stagger the animations
          }}
          className='absolute w-full h-[1100px] rounded-tl-full bg-gradient-to-b from-blue-800 via-cyan-500 to-transparent mt-40'
        />
      </div>

      {/* Column 7 */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -400 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-tl-full bg-gradient-to-b from-blue-800 via-cyan-500 to-transparent'
        />
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -1100 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: 5 // Stagger the animations
          }}
          className='absolute w-full h-[1100px] rounded-tr-full bg-gradient-to-b from-blue-800 via-cyan-500 to-transparent mt-40'
        />
      </div>

      {/* Column 8 */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>
      
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
      </div>

      {/* Column 5 haa krna toh padeegaa hiiii */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: -400 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-br-full bg-gradient-to-t from-purple-600 via-fuchsia-500 to-transparent'
        />
      </div>

      {/* Column 6 */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -400 }}
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-tr-full bg-gradient-to-b from-purple-600 via-fuchsia-500 to-transparent'
        />
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -1100 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: 5 // Stagger the animations
          }}
          className='absolute w-full h-[1100px] rounded-tl-full bg-gradient-to-b from-blue-800 via-cyan-500 to-transparent mt-40'
        />
      </div>

      {/* Column 7 */}
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -400 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-tl-full bg-gradient-to-b from-blue-800 via-cyan-500 to-transparent'
        />
        <motion.div
          initial={{ y: "100vh" }}
          animate={{ y: -1100 }}
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: 5 // Stagger the animations
          }}
          className='absolute w-full h-[1100px] rounded-tr-full bg-gradient-to-b from-blue-800 via-cyan-500 to-transparent mt-40'
        />
      </div>

      {/* Cloumn 10 */ }
      <div className='relative min-h-screen w-[30px] overflow-hidden mr-1'>
        <motion.div
          initial={{ y: -400 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
          className='absolute w-full h-[400px] rounded-bl-full bg-gradient-to-t from-purple-600 via-fuchsia-500 to-transparent'
        />
      </div>


      

    </div>
  )
}

export default BgAnim