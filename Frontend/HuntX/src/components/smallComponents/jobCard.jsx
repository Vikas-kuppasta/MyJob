import React from 'react'
import { FaRegBookmark } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const jobCard = () => {
  const navigate = useNavigate();
  const jobId = 'weriuyjtfuyui';
  return (
<>
    <main className='flex flex-col gap-4 h-fit p-2 rounded-md  bg-white shadow-2xl'>
      <div className='flex justify-between items-center'>
        <span className='rounded-full p-2 text-sm shadow-xl'>2days ago</span>
        <span className='p-2 rounded-full bg-gray-100 '><FaRegBookmark className='w-5 h-5'/></span>
      </div>

      <div className='flex justify-between items-center'>
        <div> 
        <p>Amazon</p>
        <p className='text-xl font-medium '>Senior UI/UX Designer</p>
        </div>

        <div className='rounded-full overflow-hidden  bg-red-300 h-10 w-10'>
          <img className='object-cover h-full w-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM2yYz5k-8e_pjhAVTY296TIUvQVW7jFSAKw&s" alt="" />
        </div>

      </div>      

      <div className='flex flex-wrap gap-2'>
          <span className='border border-black border-solid w-fit h-fit text-sm p-2 rounded-full'>Part time</span>
          <span className='border border-black border-solid w-fit h-fit text-sm p-2 rounded-full'>Part time</span>
          <span className='border border-black border-solid w-fit h-fit text-sm p-2 rounded-full'>Part time</span>
          <span className='border border-black border-solid w-fit h-fit text-sm p-2 rounded-full'>Part time</span>
      </div>

      <div className='flex justify-between items-center'>
        <div>
          <p className='text-lg font-bold '>0-2LPA</p>
          <p className='text-gray-400'>San Fransisco</p>
        </div>

        <button onClick={()=>(navigate(`/jobs/description/${jobId}`))} className='p-2 rounded-full bg-black cursor-pointer text-white'>Details</button>
      </div>
    </main>
</>
  )
}

export default jobCard