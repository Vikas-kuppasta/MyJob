import React from 'react'
import { FaRegBookmark } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/badge';
import banner from '../../../public/banner.jpg'
import axios from 'axios';
import { ALLJOB_API_END_POINT } from '@/constants/constant';
import { toast } from 'sonner';
const jobCard = ({job,savedJob}) => {
  const savejob = async(id)=>{
    try {
      const res = await axios.post(`${ALLJOB_API_END_POINT}/save-job/${id}`,{},{
        withCredentials:true,
      });
      if(res.data.success){
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    }
  }
  const navigate = useNavigate();
  
    const createdAt = new Date(savedJob ? savedJob.job.createdAt:job?.createdAt);
    const currentTime = new Date();
    const difference = currentTime-createdAt;
    const day = Math.floor(difference/(1000*24*60*60));
  
  return (
<>
    <main className='flex flex-col gap-4 h-fit p-2 rounded-md  bg-white shadow-2xl'>
      <div className='flex justify-between items-center'>
        <span onClick={()=>savejob(savedJob ? savedJob.job._id : job._id)} className='p-2 rounded-full bg-gray-100 '><FaRegBookmark  className='w-5 h-5'/></span>
        <span className='rounded-md bg-gray-100 p-1 text-sm '>{day ==0 ? ("Today"):day}  days ago</span>
      </div>

      <div className='flex justify-between items-center'>
        <div> 
        <p>{savedJob ? savedJob?.job?.company?.name : job?.company?.name }</p>
        <p className='text-2xl text-blue-900 font-semibold '>{savedJob ? savedJob?.job?.title : job?.title }</p>
        </div>

        <div className='rounded-full overflow-hidden   h-10 w-10'>
          <img className='object-cover h-full w-full' src={savedJob ? savedJob?.job?.company?.companyProfile?.companyLogo : job ? job?.company?.companyProfile?.companyLogo : banner} alt="" />
        </div>

      </div>      

      <div className='flex flex-wrap gap-2'>

        {
          savedJob ? savedJob.job.requirements.map((list,index)=>(
            <Badge className="rounded-md text-md bg-blue-100 text-black border border-blue-500" key={index}>{list}</Badge>
          )) :
          job?.requirements?.map((list,index)=>(
            <Badge className="rounded-md text-md bg-blue-100 text-black border border-blue-500" key={index}>{list}</Badge>
          ))
        }
    
      </div>

      <div className='flex justify-between mt-5 items-center'>
        <div>
          <p className='text-lg font-bold '>{savedJob ? savedJob.job.salary : job?.salary} LPA</p>
          <p className='text-gray-400'>{savedJob ? savedJob.job.location : job?.location}</p>
        </div>

        <button onClick={()=>(navigate(`/jobs/description/${savedJob ? savedJob.job._id:job?._id}`))} className='px-4 py-1 rounded-full text-lg bg-blue-900 cursor-pointer text-white'>Details</button>
      </div>
    </main>
</>
  )
}

export default jobCard