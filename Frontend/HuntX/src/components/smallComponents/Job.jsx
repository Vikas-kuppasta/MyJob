import React, { useEffect, useMemo, useState } from 'react'
import JobCard from './JobCard'
import useGetAllJob from '@/hooks/useGetAllJob'
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
const job = () => {
    const{filters,setFilters} = useOutletContext();
    const [input,setInput] = useState("");
  
    const[searchKeyword,setSearchKeyword] = useState("");

    useEffect(()=>{
      const timer = setTimeout(()=>{
        setSearchKeyword(input)
      },500);

      return ()=>clearTimeout(timer);
    },[input]);

    

    const finalFilters = useMemo(() => ({
    ...filters,
    keyword: searchKeyword,
  }), [filters, searchKeyword]);

  useGetAllJob(finalFilters);

  const {Jobs} = useSelector(store=>store.job);

    
   
  return (
<>
  <main className=' w-full '>
    <div className=' md:max-w-lg lg:max-w-2xl mx-auto flex items-center border bg-white hover:border-blue-300 rounded-full shadow-lg shadow-blue-200'>
      <BiSearch className='ml-3 text-gray-400 w-6 h-6'/>
      <input onChange={(e)=>(setInput(e.target.value))} value={input}className=' w-full p-2 outline-none  placeholder:text-gray-400 placeholder:text-sm   ' placeholder='Search jobs...' type="text" name="" id="" />
    </div>
    <div className=' max-sm:p-3 p-6 w-full max-w-6xl mx-auto h-fit border-l-gray-200 border-solid   grid max-md:grid-cols-1 lg:grid-cols-2  gap-4 '>
        
        {
          
        Jobs.map((job) => (
          <JobCard key={job._id} job={job}/>
        ))}
        
    </div>
  </main>
</>
  )
}

export default job