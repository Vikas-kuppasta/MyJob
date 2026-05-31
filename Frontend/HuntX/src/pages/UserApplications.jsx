import AppliedJobTable from '@/components/smallComponents/AppliedJobTable'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import { useSelector } from 'react-redux';

const UserApplications = () => {
  useGetAppliedJobs();
  const[search,setSearch] = useState("");
  const[debounce,setDebounce] = useState("");
  
    useEffect(()=>{
      const timer = setTimeout(()=>{
        setDebounce(search);
      },500);
      return ()=> clearTimeout(timer);
    },[search]);

  const{appliedJobs} = useSelector(store=>store.application);

  const filteredApplication = appliedJobs.filter((appliedJob)=>{
    const job = appliedJob.job;
    return(
      job?.title?.toLowerCase().includes(debounce.toLowerCase()) ||
    job?.company?.name?.toLowerCase().includes(debounce.toLowerCase()) ||
    job?.location?.toLowerCase().includes(debounce.toLowerCase())
    );
  });
  return (
    <>
      <main className='h-screen p-4 w-full'>
        <div>
          <h2 className='text-4xl font-semibold'>Applications</h2>
          <p className='text-gray-400 text-sm'>Track your application status in real time.</p>
        </div>

        <div className='flex hover:border-blue-300 items-center mx-auto bg-white rounded-full shadow-sm shadow-blue-400 border p-2 w-full max-w-3xl my-5'>
          <BiSearch className='mr-2 w-5 h-5'/>
          <input onChange={(e)=>(setSearch(e.target.value))} value={search} className='w-full outline-none' type="text" placeholder='Search applied Jobs...' />
        </div>

        <div className=' mx-auto rounded-md border bg-white w-full max-w-5xl'>
          <h1 className='text-2xl m-3 font-semibold mb-4'>Applied Jobs</h1>
          <div className='      w-full'>
            <AppliedJobTable appliedJobs={filteredApplication} />
          </div>
        </div>
      </main>
    </>
  )
}

export default UserApplications