import React from 'react'
import JobCard from '../smallComponents/jobCard'
import useGetAllJob from '@/hooks/useGetAllJob'
import { useSelector } from 'react-redux';
const job = () => {
    useGetAllJob();
    const {Jobs} = useSelector(store=>store.job);
  return (
<>
    <main className='border-l-2 bg-blue-50 p-6 w-full border-l-gray-200 border-solid h-screen  grid max-sm:grid-cols-1 grid-cols-3 gap-4 '>
        
        {Jobs.map((job) => (
          <JobCard key={job._id} job={job}/>
        ))}
        
    </main>
</>
  )
}

export default job