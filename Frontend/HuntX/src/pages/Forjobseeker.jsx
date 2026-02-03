import React from 'react'
import growth from '../assets/growth2.png'
import { TbHandClick } from 'react-icons/tb';
import { BiToggleRight } from 'react-icons/bi';
import {Link, useNavigate} from 'react-router-dom'
import { BsWindowSidebar } from 'react-icons/bs';
const Forjobseeker = () => {
  const navigate = useNavigate();
  return (
    <>
    <main className="flex mb-10 h-screen ">
      {/* img */}
      <div className='p-5 py-10 w-1/2 h-150 '>
        <img src={growth} className='w-140 h-140' alt="" />
      </div>

      {/* description */}
      <div className='w-1/2 p-4 py-10 h-150 flex flex-col gap-10'>
        <h1 className='text-5xl font-semibold'>Brand yourself for new opportunities</h1>
        <p className='text-2xl  w-135'>Create a profile that highlights your unique skills and preferences, then apply to jobs with just one click</p>

        <div className='flex flex-col gap-4'>
          <section className='flex gap-10'>
            <TbHandClick className='text-5xl text-white bg-blue-300 p-2 rounded-full'/>
            <span className='flex flex-col gap-1 w-100'>
              <h4 className='text-xl font-medium'>One click apply</h4>
              <p>Say goodbye to cover letters - your profile is all you need. One click to apply then you're done.</p>
            </span>
          </section>

          <section className='flex gap-10'>
            <BiToggleRight className='text-5xl text-white bg-blue-300 p-2 rounded-full'/>
            <span className='flex flex-col gap-1 w-100'>
              <h4 className='text-xl font-medium'>Set your preferences</h4>
              <p>Streamline the interview process by setting your expectations (salary, industry, culture, etc.) upfront.</p>
            </span>
          </section>
        </div>
          
          <button onClick={()=>{navigate('/signup');window.scrollTo(0,0)}} className='px-5 py-2 text-white cursor-pointer rounded-xl bg-black w-fit'>Create your profile for free</button>
          

      </div>
    </main>
    </>
  )
}

export default Forjobseeker