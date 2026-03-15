import React from 'react'
import { FaRegBookmark } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/badge';
import banner from '../../../public/banner.jpg'
const jobCard = ({job}) => {
  const navigate = useNavigate();

  return (
<>
    <main className='flex flex-col gap-4 h-fit p-2 rounded-md  bg-white shadow-2xl'>
      <div className='flex justify-between items-center'>
        <span className='p-2 rounded-full bg-gray-100 '><FaRegBookmark className='w-5 h-5'/></span>
        <span className='rounded-md bg-gray-100 p-1 text-sm '>2 days ago</span>
      </div>

      <div className='flex justify-between items-center'>
        <div> 
        <p>{job?.company?.name}</p>
        <p className='text-2xl text-blue-900 font-semibold '>{job?.title}</p>
        </div>

        <div className='rounded-full overflow-hidden   h-10 w-10'>
          <img className='object-cover h-full w-full' src={job?.companyProfile?.companyLogo||banner} alt="" />
        </div>

      </div>      

      <div className='flex flex-wrap gap-2'>

        {
          job?.requirements?.map((list,index)=>(
            <Badge className="rounded-md text-md bg-blue-100 text-black border border-blue-500" key={index}>{list}</Badge>
          ))
        }
    
      </div>

      <div className='flex justify-between items-center'>
        <div>
          <p className='text-lg font-bold '>{job?.salary} LPA</p>
          <p className='text-gray-400'>{job?.location}</p>
        </div>

        <button onClick={()=>(navigate(`/jobs/description/${job?._id}`))} className='px-4 py-1 rounded-full text-lg bg-blue-900 cursor-pointer text-white'>Details</button>
      </div>
    </main>
</>
  )
}

export default jobCard