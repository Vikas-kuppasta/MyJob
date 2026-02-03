import React from 'react'
import recruiter from '../assets/recruiter2.png'
import { FaArrowRightLong } from "react-icons/fa6";

const ForCompanies = () => {
  return (
   <>
    <main className='flex h-screen items-center'>
        {/* image */}
        <div className='px-5 py-10 w-1/2 h-150'>
            <img src={recruiter} alt="" />
        </div>
        {/* description */}
        <div className='w-1/2 px-5 py-10 h-150 flex flex-col gap-5'>
            <p className='text-blue-400 text-xl tracking-wide font-medium'>A WORLD OF TALENT AT YOUR FINGERTIPS</p>
            <h1 className='text-6xl font-bold'>Instant access to a talent pool of 10M+</h1>
            <p className='text-2xl '>Access the largest talent pool of startup-minded job seekers in seconds. Our diverse community comes to Hired<span className='text-blue-400'>ly</span> from across the globe to find their next job, spanning a variety of industries, skill levels, and backgrounds. No matter what you’re looking for in your next hire, you’ll find it here.</p>
            <span className='flex gap-4 text-2xl text-blue-500 items-center'>Discover our talent <FaArrowRightLong/></span>
        </div>
    </main>
   </>
  )
}

export default ForCompanies