import JobDropbox from '@/components/smallComponents/JobDropbox'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import useGetAdminJobs from '@/hooks/useGetAdminJobs'

import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const MyJobs = () => {
  useGetAdminJobs();
  const {adminJobs} = useSelector(store=>store.job);
  

  
  return (
    <main className='p-4 bg-blue-100/30 h-screen'>
        <div className='flex mb-4 '>
                  <SidebarTrigger className="mr-2"/>
                  <div>
                    <h3 className='font-semibold text-xl '>My Job Postings</h3>
                    <p className='text-gray-400 text-[12px]'>All jobs you've posted across companies</p>
                  </div>
        </div>
{/* ////// */}

        <div className="max-w-5xl mx-auto">
            <input
            type="text"
            placeholder="Enter company name"
            className="w-full p-2 mb-3 bg-white rounded-lg placeholder:text-gray-500 border focus:outline-none focus:border-blue-500"
            />
        </div>
                

        {/* /////// */}

        <div className='bg-white mx-auto w-full max-w-5xl  rounded-md '>
        
                     {
                      adminJobs?.map((jobs,index)=>(

                      <div key={index} className='flex mt-1 justify-between items-center border-b mx-3 border-b-gray-100 p-3 '>
                          <span className='flex items-center gap-3'>
                            <div className='flex justify-center items-center w-10 h-10 rounded-md overflow-hidden '>
                             {jobs?.company?.companyProfile?.companyLogo ? <img  src={jobs?.company?.companyProfile?.companyLogo}/> : <h4 className='flex justify-center items-center w-10 h-10 bg-blue-100 rounded-md text-blue-500'>FE</h4>}
                            </div>
                            
                            <div>
                              <h4 className='font-semibold text-sm'>{jobs?.company?.name}</h4>
                              <p className='text-gray-500 text-[12px]'>{jobs?.title} - {jobs?.jobtype}</p>
                            </div>
                          </span>
                        
                        <div className='flex items-center gap-2'>

                          <Button className="bg-green-100 rounded-full p-3 text-green-500 text-[12px]">
                            Active
                          </Button>
                          <JobDropbox id={jobs._id}/>
                          {/* <BsThreeDotsVertical className='cursor-pointer'/> */}
                        </div>
                        
                      </div>
                      
                      ))
                     }
                    
                      {/* <div className='flex mt-1 justify-between items-center border-b mx-3 border-b-gray-100 p-3 '>
                          <span className='flex items-center gap-3'>
                            <h4 className='flex justify-center items-center w-8 h-8 bg-blue-100 rounded-md text-blue-500'>FE</h4>
                            <div>
                              <h4 className='font-semibold text-sm'>Frontend Engineer</h4>
                              <p className='text-gray-500 text-[12px]'>TechCorp - Remote</p>
                            </div>
                          </span>
        
                          <Button className="bg-green-100 rounded-full p-3 text-green-500 text-[12px]">
                            Active
                          </Button>
                      </div> */}
        
        </div>
    </main>    
  )
}

export default MyJobs