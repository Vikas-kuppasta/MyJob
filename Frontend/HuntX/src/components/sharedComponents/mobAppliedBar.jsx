import React from 'react'
import { BiCalendarAlt, BiRightArrow, BiRightArrowAlt } from 'react-icons/bi'
import { Badge } from '../ui/badge'
import {  useLocation, useNavigate } from 'react-router-dom'

const mobAppliedBar = ({appliedJobs}) => {
    const navigate = useNavigate();
    const location = useLocation();
  return (
<>
    <main className='md:hidden w-full bg-white border rounded-md'>
        <div className='flex justify-between items-center p-2 border-b'>
            <h1 className='text-xl font-semibold'>Applied Jobs</h1>
            <span onClick={()=>navigate("/profile/applications")} className={`${location.pathname === "/profile/applications" ? "hidden" : null} flex items-center text-[12px] text-blue-500`}>view All <BiRightArrowAlt className='ml-2'/></span>
        </div>
        {
            appliedJobs.slice(0,4).map((data,index)=>(
                <div key={index} className='flex items-center justify-between p-2 border-b'>
            <span className='flex items-center gap-4'>
                <div className='flex w-8 h-8 rounded-md justify-center items-center bg-blue-100 text-blue-600'>
                    <BiCalendarAlt className='w-5 h-5 '/>
                </div>
                <div>
                    <p className='text-[10px]'>{new Date(data?.createdAt).toLocaleDateString()}</p>
                    <div>
                        <p className='text-lg font-semibold'>{data?.job?.title}</p>
                        <div className='flex gap-2 mt-2 items-center gap-4 '>
                            <img src={data?.job?.company?.companyProfile?.companyLogo} className="w-10 h-10 object-cover rounded-full" alt="" />
                            <p className='text-sm text-gray-600'>{data?.job?.company?.name}</p>
                        </div>
                    </div>

                </div>
            </span>
            <Badge className={`bg-blue-100 text-blue-500`}>{data?.status}</Badge>
        </div>
            ))
        }
        
        

    </main>
</>
  )
}

export default mobAppliedBar