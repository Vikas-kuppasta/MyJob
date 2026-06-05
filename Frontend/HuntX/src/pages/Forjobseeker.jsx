import React from 'react'
import growth from '../assets/growth2.png'
import { TbHandClick } from 'react-icons/tb';
import { BiToggleRight } from 'react-icons/bi';
import {Link, useNavigate} from 'react-router-dom'
import { BsWindowSidebar } from 'react-icons/bs';
import Reveal from '@/components/Animation/Revel';
import {motion} from 'framer-motion'
import { containerVariants, itemVariants } from '@/components/Animation/animate';


const Forjobseeker = () => {
  const navigate = useNavigate();
  return (
    <>
    <main className="flex max-sm:flex-col mb-10 lg:h-screen ">
      {/* img */}

      <div className='p-5 py-10 xl:w-1/2 max-sm:py-5  '>
      <Reveal>
        <img src={growth} className=' lg:w-140 lg:h-140' alt="" />
      </Reveal>
      </div>

      {/* description */}
      <motion.div variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} className=' md:w-1/2 p-4 py-10 h-150 flex flex-col gap-10 max-sm:gap-5'>
        <motion.div   variants={itemVariants}>

        <h1 className='text-3xl lg:text-5xl font-semibold'>Brand yourself for new opportunities</h1>
        </motion.div>
        <motion.div   variants={itemVariants}>

        <p className=' lg:text-2xl  xl:w-135'>Create a profile that highlights your unique skills and preferences, then apply to jobs with just one click</p>
        </motion.div>

        <div className='flex flex-col  gap-4'>
          <motion.div variants={itemVariants} >

          <section className='flex gap-10 '>
            <TbHandClick className='max-md:w-10 max-md:h-10 md:text-5xl text-white bg-blue-300 p-2 rounded-full'/>
            <div className='  flex flex-col gap-1 lg:w-100'>
              <h4 className='md:text-xl font-medium'>One click apply</h4>
              <p className='max-sm:w-50 max-lg:w-60 '>Say goodbye to cover letters - your profile is all you need. One click to apply then you're done.</p>
            </div>
          </section>
          </motion.div>
          <motion.div variants={itemVariants}>
          <section className='flex gap-10'>
            <BiToggleRight className='max-md:w-10 max-md:h-10 md:text-5xl text-white bg-blue-300 p-2 rounded-full'/>
            <span className='flex flex-col gap-1 lg:w-100'>
              <h4 className='md:text-xl font-medium'>Set your preferences</h4>
              <p className='max-md:w-50 max-lg:w-60 '>Streamline the interview process by setting your expectations (salary, industry, culture, etc.) upfront.</p>
            </span>
          </section>
          </motion.div>
        </div>

          <motion.div variants={itemVariants}>
          <button onClick={()=>{navigate('/signup');window.scrollTo(0,0)}} className='max-sm:px-3 max-sm:py-1 max-sm:mt-3 px-5 py-2 text-white cursor-pointer rounded-xl bg-black w-fit'>Create your profile for free</button>
          </motion.div>
          

      </motion.div>
    </main>
    </>
  )
}

export default Forjobseeker