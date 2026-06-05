import React from 'react'
import recruiter from '../assets/recruiter2.png'
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/components/Animation/animate';
const ForCompanies = () => {
  return (
   <>
    <motion.div variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} className='flex max-sm:flex-col  lg:h-screen lg:items-center'>
        {/* image */}
        <motion.div variants={itemVariants} className='max-md:py-5 px-5 py-10 md:w-1/2  lg:h-150'>
            <img src={recruiter} alt="" />
        </motion.div>
        {/* description */}
        <motion.div variants={itemVariants} className='md:w-1/2 max-md:py-5 px-5 py-10 xl:h-150 flex flex-col gap-5'>
            <p className='text-blue-400 max-md:text-[13px] lg:text-xl tracking-wide font-medium'>A WORLD OF TALENT AT YOUR FINGERTIPS</p>
            <h1 className='max-md:text-3xl md:text-4xl xl:text-6xl font-bold'>Instant access to a talent pool of 10M+</h1>
            <p className='xl:text-2xl '>Access the largest talent pool of startup-minded job seekers in seconds. Our diverse community comes to Hired<span className='text-blue-400'>ly</span> from across the globe to find their next job, spanning a variety of industries, skill levels, and backgrounds. No matter what you’re looking for in your next hire, you’ll find it here.</p>
            <span className='flex gap-4 text-2xl text-blue-500 items-center'>Discover our talent <FaArrowRightLong/></span>
        </motion.div>
    </motion.div>
   </>
  )
}

export default ForCompanies