import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react';
import { animatedCards } from '@/assets/assets';
import Navbar from '@/components/sharedComponents/Navbar';
import { FaSearch } from 'react-icons/fa';

const Herosection = () => {

    return (
<>
{/* <Navbar/> */}
    <main className='relative flex  overflow-hidden gap-3 flex-wrap  justify-center   h-140 bg-white'>
        <div className=' inline-grid grid-cols-5  gap-10  '>
            {animatedCards.map((card, i) => (
                <motion.div key={i}
                    animate={card.float}
                    className='w-fit h-fit p-5 shadow-blue-300 shadow-sm border-2 border-solid border-gray-300   flex justify-center items-center rounded-md bg-white'>{card.title}</motion.div>
            ))}
        </div>

        <div className='z-1 top-20 absolute opacity-50 blur-[75px]  bg-black/25 w-200 h-100'></div>
        
        
    <div className=' z-5 rounded-xl p-2 py-9 absolute top-40   flex justify-between items-center  bg-white/85 w-200'>
            <h1 className='text-4xl font-semibold'>“Find Your <span className='text-blue-500'>Dream job</span>”</h1>

        <div className='border-2 border-dashed rounded-md border-blue-500 p-4 w-100 '>
         <div className='flex border border-gray-400  active:border-blue-500 rounded-md '>

            <input className='h-10 p-2 outline-0 w-full ' type="text" placeholder='Find your dream job'  />
            <button className='bg-blue-500 text-white px-2 rounded-r-md'><FaSearch/></button>
         </div>
        </div>
            
    </div>



    </main>
</>
    )
}

export default Herosection