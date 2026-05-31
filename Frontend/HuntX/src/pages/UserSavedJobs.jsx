import useGetAllSavedJob from '@/hooks/useGetAllSavedjob';
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import JobCard from '@/components/smallComponents/jobCard';
import { useSelector } from 'react-redux';
const UserSavedJobs = () => {
  useGetAllSavedJob();
  const[search,setSearch] = useState("");
  const[debounce,setDebounce] = useState("");

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebounce(search);
    },500);
    return ()=> clearTimeout(timer);
  },[search]);

  const {savedJobs} = useSelector(store=>store.job);

  const filteredJob = savedJobs.filter((savedJob)=>{
    const job = savedJob.job;
    return(
      job?.title?.toLowerCase().includes(debounce.toLowerCase()) ||
    job?.company?.name?.toLowerCase().includes(debounce.toLowerCase()) ||
    job?.location?.toLowerCase().includes(debounce.toLowerCase())
    );
  });
  return (
    <>
      <main className='w-full p-4 h-screen'>

        <div>
          <h2 className='text-4xl font-semibold'>Saved Jobs</h2>
          <p className='text-gray-400 text-sm'>Track opportunities you want to apply for later.</p>
        </div>

        <div className='flex hover:border-blue-300 items-center mx-auto bg-white rounded-full shadow-sm shadow-blue-400 border p-2 w-full max-w-3xl my-5'>
          <BiSearch className='mr-2 w-5 h-5' />
          <input onChange={(e)=>setSearch(e.target.value)} value={search} className='w-full outline-none' type="text" placeholder='Search saved jobs...' />
        </div>

        <div className='  p-6 w-full max-w-6xl mx-auto h-fit border-l-gray-200 border-solid   grid max-md:grid-cols-1 lg:grid-cols-2  gap-4 '>
        
        {
          
        filteredJob.map((savedJob) => (
          <JobCard key={savedJob._id} savedJob={savedJob}/>
        ))}
        
    </div>

      </main>
    </>
  )
}

export default UserSavedJobs