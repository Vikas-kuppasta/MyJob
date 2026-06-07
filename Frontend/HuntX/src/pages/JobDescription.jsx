import React, { useEffect, useState } from 'react'
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
import { ALLJOB_API_END_POINT, APPLICATION_API_END_POINT } from '@/constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/getJobSlice';
import { toast } from 'sonner';
const JobDescription = () => {
    const dispatch = useDispatch();
    const jobId = useParams();
    const {singleJob} = useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth)
    const alreadyApplied = singleJob?.application?.some(application=>application.applicant === user?._id || false);
    const [isApplied ,setIsApplied] =useState(alreadyApplied);
    
    const applyhandler = async()=>{
        try{
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId.id}`,{
                withCredentials:true,
            });
            if(res.data.success){
                setIsApplied(true);
                const updatedSingleJob = {...singleJob,application:[...singleJob.application,{applicant:user?._id}]};
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.response?.data?.message);
        }
    }
    useEffect(()=>{
        const fetchSingleJob = async()=>{

            try {
                const res = await axios.get(`${ALLJOB_API_END_POINT}/get/${jobId.id}`,{
                    withCredentials:true,
                });
                if(res.data.success){
                    console.log(res.data.job);
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.application?.some(application=>application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
        
    },[])

   

  return (
    <main className='w-full min-h-screen '>

        <div className='w-full  relative  h-43'>
         <img className='h-35 rounded-md w-full object-cover' src={singleJob?.company?.companyProfile?.companyBanner||banner} alt="" />
         <img className='w-30 h-30 absolute top-12 left-5 rounded-full' src={singleJob?.company?.companyProfile?.companyLogo||userLogo} alt="" />
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
            <Button onClick={isApplied ? null:applyhandler} disabled={isApplied} className={`rounded-full bg-blue-600 cursor-pointer hover:bg-blue-700`} >{isApplied? "Already Applied" : "Apply now"}</Button>
        </div>

          <div className='max-sm:flex-col  flex gap-3 justify-between py-4  border-t border-t-blue-400 mt-2'>
                <div className='max-sm:w-full w-1/2 bg-white shadow-xl rounded-xl px-4 py-2 flex flex-col gap-4' > 
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
                                <p className='font-medium'>Total Applicants: <span className='font-normal'>{singleJob?.application?.length}</span></p>
                                <FaPeopleGroup className='w-5 h-5 text-gray-600' />
                                </div>
                             </li>
                            <li className=''>
                                <div className='flex items-center justify-between'>
                                <p className='font-medium'>Posted Date: <span className='font-normal'>{new Date(singleJob?.createdAt).toLocaleDateString()}</span></p>
                                <FaCalendarAlt className='w-5 h-5 text-gray-600' />
                                </div>
                             </li>
                        </ul>

                    </div>

                </div>

                <div className='max-sm:w-full w-1/2 bg-white shadow-xl  rounded-xl px-4 py-2' >
                    <h3 className='text-xl font-semibold'>Job Description</h3>
                    <p>{singleJob?.description}</p>
                </div>
          </div>
        </div>

    </main>
  )
}

export default JobDescription