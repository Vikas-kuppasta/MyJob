import React from 'react'
import {  BiSolidDashboard } from 'react-icons/bi'
import { FaRegBookmark } from 'react-icons/fa6'
import { IoIosListBox } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'

const UserSideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
  return (
<>
    <main className='w-50 bg-white overflow-hidden border rounded-md max-sm:hidden   '>
        <span onClick={()=>(navigate("/profile"))} className={`${location.pathname==="/profile" ? "bg-blue-100 text-blue-600 " : "text-gray-500"} flex h-10 cursor-pointer items-center text-sm `}>
            <div className={` w-1 h-full ${location.pathname==="/profile" ? "bg-blue-500" : null} `}></div>
            <div className={`flex mx-auto font-medium  gap-4 items-center`}>
                <BiSolidDashboard/>
                <h3 className='w-25 '>Dashboard</h3>
            </div>
        </span>
        <span onClick={()=>(navigate("/profile/applications"))} className={`${location.pathname==="/profile/applications" ? "bg-blue-100 text-blue-600 " : "text-gray-500"} flex h-10  cursor-pointer items-center text-sm`}>
            <div className={` w-1 h-full ${location.pathname==="/profile/applications" ? "bg-blue-600" : "text-gray-500"} `}></div>
            <div className='flex  mx-auto font-medium gap-4 items-center'>
                <IoIosListBox/>
                <h3 className='w-25'>Applications</h3>
            </div>
        </span>
        
        <span onClick={()=>(navigate("/profile/saved-jobs"))} className={`${location.pathname==="/profile/saved-jobs" ? "bg-blue-100 text-blue-600 " : "text-gray-500"} flex h-10 cursor-pointer items-center text-sm`}>
            <div className={` w-1 h-full ${location.pathname==="/profile/saved-jobs" ? "bg-blue-600" : null} `}></div>
            <div className='flex mx-auto font-medium gap-4 items-center'>
                <FaRegBookmark/>
                <h3 className='w-25'>Saved Jobs</h3>
            </div>
        </span>
        
    </main>
</>
  )
}

export default UserSideBar