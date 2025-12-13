import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react';
import { animatedCards } from '@/assets/assets';

const Herosection = () => {

    return (
        <>
            <main className='relative flex  overflow-hidden gap-3 flex-wrap  justify-center  w-full h-screen bg-white'>
                <div className='inline-grid grid-cols-5  gap-10  '>
                    {animatedCards.map((card, i) => (
                        <motion.div key={i}
                            animate={card.float}
                            className='w-fit h-fit p-5 shadow-blue-300 shadow-sm border-2 border-solid border-gray-300   flex justify-center items-center rounded-md bg-white'>{card.title}</motion.div>
                    ))}
                </div>

                <div className='z-1 top-20 absolute opacity-50 blur-[75px]  bg-black/25 w-200 h-100'></div>



            </main>
        </>
    )
}

export default Herosection