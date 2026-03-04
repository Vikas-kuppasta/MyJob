import React from 'react'
import banner from '../../public/banner.jpg'
import userLogo from '../../public/Defaultuserlogo.png'
import { Button } from '@/components/ui/button'
import { FaRegClock } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { Badge } from '@/components/ui/badge';
const JobDescription = () => {
  return (
    <main className='w-full '>

        <div className='w-full relative  h-43'>
         <img className='h-35 w-full object-cover' src={banner} alt="" />
         <img className='w-30 h-30 absolute top-12 left-5 rounded-full' src={userLogo} alt="" />
        </div>

        <div className='p-2'>
          <div className=' flex  justify-between '>
            <div className=''>
                <h1 className='text-2xl font-semibold ' >Frontend Developer</h1>
                <h6 className='text-gray-500'>Hyderabad</h6>
                <div className='flex items-center gap-3 mt-2'>
                    <Badge className='bg-blue-800 text-white' >10 Positions</Badge>
                    <Badge className='bg-blue-800 text-white' >Part time</Badge>
                    
                </div>
            </div>
            <Button className="rounded-full bg-blue-600 cursor-pointer hover:bg-blue-700" >Apply Now</Button>
        </div>

          <div className='flex gap-3 justify-between py-4  border-t border-t-blue-400 mt-2'>
                <div className='w-1/2 bg-white shadow-xl rounded-xl px-4 py-2 flex flex-col gap-4' > 
                    <h3 className='text-xl font-semibold'>Job Details</h3>
                    <div className=''>
                        <ul className='list-disc space-y-2  list-outside pl-5'>
                            <li className=''>
                                <div className='flex items-center justify-between'>
                                <p className='font-medium'>Experience: <span className='font-normal'>2 yrs</span></p>
                                <FaRegClock className='w-5 h-5 text-gray-600 ' />
                                </div>
                             </li>
                            <li className=''>
                                <div className='flex items-center justify-between'>
                                <p className='font-medium'>Salary: <span className='font-normal'>12 LPA</span></p>
                                <GrMoney className='w-5 h-5 text-gray-600' />
                                </div>
                             </li>
                            <li className=''>
                                <div className='flex items-center justify-between'>
                                <p className='font-medium'>Total Applicants: <span className='font-normal'>5</span></p>
                                <FaPeopleGroup className='w-5 h-5 text-gray-600' />
                                </div>
                             </li>
                            <li className=''>
                                <div className='flex items-center justify-between'>
                                <p className='font-medium'>Posted Date: <span className='font-normal'>8-02-26</span></p>
                                <FaCalendarAlt className='w-5 h-5 text-gray-600' />
                                </div>
                             </li>
                        </ul>

                    </div>

                </div>

                <div className='w-1/2 bg-white shadow-xl  rounded-xl px-4 py-2' >
                    <h3 className='text-xl font-semibold'>Job Description</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta, mollitia. Dolores iusto beatae nobis suscipit minus ipsam, id quasi sapiente.</p>
                </div>
          </div>
        </div>

    </main>
  )
}

export default JobDescription