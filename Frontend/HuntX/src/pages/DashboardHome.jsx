import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import useGetAdminJobs from '@/hooks/useGetAdminJobs'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import React from 'react'
import {  BiBriefcase, BiBuilding, BiPlus,  BiRightArrowAlt, BiUser } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const DashboardHome = () => {
  useGetAllCompanies();
  useGetAdminJobs();
  const navigate  = useNavigate();
  const {adminJobs} = useSelector(store=>store.job);
  const {Companies} = useSelector(store=>store.company);
  
  

  let totalApplicants=0;
  adminJobs.map((job,_)=>{
    const applicants = job?.application?.length;
    totalApplicants = totalApplicants + applicants;
  });

  return (
    <>
    <main className='p-4 bg-blue-100/30 overflow-hidden h-full'>

      <div className='flex justify-between items-center'>

        <div className='flex '>
          <SidebarTrigger className="mr-2"/>
          <div>
            <h3 className='font-semibold text-xl '>Dashboard</h3>
            <p className='text-gray-400 text-[12px]'>Your hiring activity at a glance</p>
          </div>
        </div>

        <div className='max-sm:hidden flex gap-3 items-center'>
          <Button onClick={()=>navigate("postcompany")} className="bg-white cursor-pointer hover:bg-white text-gray-600">
            <BiBuilding className='mr-2 h-4 w-4'/>
            Add Company
          </Button>

          <Button onClick={()=>navigate("postjob")} className="bg-blue-600 cursor-pointer hover:bg-blue-600 text-white">
            <BiPlus className='mr-2 h-4 w-4'/>
            Post Job
          </Button>
        </div>

      </div>

      <div className=' h-full md:mx-18  p-4  '>
        <div className='max-sm:hidden grid  grid-cols-3 gap-3'>
        

          <div className='bg-white  rounded-md p-4'>
            <BiBuilding className='h-8 w-8 p-[3px] bg-blue-100 rounded-md text-blue-600'/>
            <p className='text-gray-500 text-[12px] my-2'>Total Companies</p>
            <p className='text-3xl font-semibold'>{Companies?.length}</p>
          </div>
        

          <div className='bg-white  rounded-md p-4'>
            <BiBriefcase className='h-8 w-8 p-[3px] bg-green-100 rounded-md text-green-600'/>
            <p className='text-gray-500 text-[12px] my-2'>Active Job Postings</p>
            <p className='text-3xl font-semibold'>{adminJobs?.length}</p>
          </div>

          <div className='bg-white rounded-md p-4'>
            <BiUser className='h-8 w-8 p-[3px] bg-orange-100 rounded-md text-orange-600'/>
            <p className='text-gray-500 text-[12px] my-2'>Total Applicants</p>
            <p className='text-3xl font-semibold'>{totalApplicants}</p>
          </div>

        </div>

        {/* job posting and my companies container */}

        <div className=' mt-4 max-sm:flex-col  flex gap-2 '>

          {/* recent job table */}
            <div className='bg-white md:w-1/2  rounded-md '>

              <div className='flex justify-between items-center p-3 border-b'>
                <h1 className='font-semibold'>Recent Job Postings</h1>
                <span onClick={()=>navigate("myjobs")} className='text-blue-500 flex items-center cursor-pointer text-[12px]'>View all <BiRightArrowAlt className='ml-2 h-4 w-4'/></span>
              </div>
            {
              adminJobs.slice(0,4).map((jobs,index)=>(

              <div key={index} className='flex mt-1 justify-between items-center border-b mx-3 border-b-gray-100 p-3 '>
                  <span className='flex items-center gap-3'>
                    <div className='flex justify-center items-center w-10 h-10 rounded-md overflow-hidden '>
                             {jobs?.company?.companyProfile?.companyLogo ? <img  src={jobs?.company?.companyProfile?.companyLogo}/> : <h4 className='flex justify-center items-center w-10 h-10 bg-blue-100 rounded-md text-blue-500'>FE</h4>}
                    </div>
                    <div>
                      <h4 className='font-semibold text-sm'>{jobs?.title}</h4>
                      <p className='text-gray-500 text-[12px]'>{jobs?.company?.name} - {jobs?.jobtype}</p>
                    </div>
                  </span>

                  <Button className=" bg-green-100 rounded-full p-3 text-green-500 text-[12px]">
                    Active
                  </Button>
              </div>
              ))
            }

            </div>

            {/* my companies table  */}
            <div className='bg-white md:w-1/2 h-fit rounded-md '>
                <div className='flex justify-between items-center p-3 border-b'>
                <h1 className='font-semibold'>My Companies</h1>
                <span onClick={()=>navigate("mycompanies")} className='text-blue-500 flex items-center cursor-pointer text-[12px]'>View all <BiRightArrowAlt className='ml-2 h-4 w-4'/></span>
              </div>
              {
                Companies.slice(0,4).map((company,index)=>(

              <div key={index} className='flex mt-1 justify-between items-center border-b mx-3 border-b-gray-100 p-3 '>
                  <span className='flex items-center gap-3'>
                   <div className='flex justify-center items-center w-10 h-10 rounded-md overflow-hidden '>
                             {company?.companyProfile?.companyLogo ? <img  src={company?.companyProfile?.companyLogo}/> : <h4 className='flex justify-center items-center w-10 h-10 bg-blue-100 rounded-md text-blue-500'>FE</h4>}
                    </div>
                    <div>
                      <h4 className='font-semibold text-sm'>{company?.name}</h4>
                      <p className='text-gray-500 text-[12px]'>{company?.industry} . {company?.location}</p>
                    </div>
                  </span>

                  <Button className="bg-blue-100 rounded-full p-3 text-blue-500 text-[12px]">
                    {company?.jobsCount} jobs
                  </Button>
              </div>
                ))
              }
            </div>

        </div>

        </div>

    </main>
    
    </>
  )
}

export default DashboardHome