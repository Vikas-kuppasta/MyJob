import React, { useEffect } from 'react'
import banner from '../../public/banner.jpg'
import userLogo from '../../public/Defaultuserlogo.png'
import { Button } from '@/components/ui/button'
import { FaRegClock } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { Badge } from '@/components/ui/badge';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ALLJOB_API_END_POINT } from '@/constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/getJobSlice';
const JobDescription = () => {
    const dispatch = useDispatch();
    const jobId = useParams();
    const {singleJob} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchSingleJob = async()=>{

            try {
                const res = await axios.get(`${ALLJOB_API_END_POINT}/get/${jobId.id}`,{
                    withCredentials:true,
                });
                if(res.data.success){
                    
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
        
    },[])
  return (
    <main className='w-full '>

        <div className='w-full relative  h-43'>
         <img className='h-35 w-full object-cover' src={singleJob?.companyProfile?.companyBanner||banner} alt="" />
         <img className='w-30 h-30 absolute top-12 left-5 rounded-full' src={singleJob?.companyProfile?.companyLogo||userLogo} alt="" />
        </div>

        <div className='p-2'>
          <div className=' flex  justify-between '>
            <div className=''>
                <h1 className='text-2xl font-semibold ' >{singleJob?.title}</h1>
                <h6 className='text-gray-500'>{singleJob?.location}</h6>
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
                                <p className='font-medium'>Experience: <span className='font-normal'>{singleJob?.experience} yrs</span></p>
                                <FaRegClock className='w-5 h-5 text-gray-600 ' />
                                </div>
                             </li>
                            <li className=''>
                                <div className='flex items-center justify-between'>
                                <p className='font-medium'>Salary: <span className='font-normal'>{singleJob?.salary} LPA</span></p>
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
                    <p>{singleJob?.description}</p>
                </div>
          </div>
        </div>

    </main>
  )
}

export default JobDescription