import React from 'react'
import { BiHeart, BiHome } from 'react-icons/bi'
import { MdOutlinePerson } from 'react-icons/md'
import { PiBagSimpleBold, PiBagSimpleFill } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const mobNavigation = () => {
    const {user} = useSelector(store=>store.auth);
    const location = useLocation();
    const navigate = useNavigate();
  return (
<>  
    {
        user ? ( <main className='px-4 py-2 flex sticky bottom-0 bg-white items-center justify-between md:hidden border-t'>
        <span onClick={()=>navigate("/")} className={`${location.pathname === "/" ? "text-blue-600":"text-gray-500"} flex flex-col items-center `}>
            <BiHome className='w-5 h-5  '/>
            <h2 className='text-[12px] font-semibold '>Home</h2>
        </span>
        <span onClick={()=>navigate("/jobs")} className={`${location.pathname === "/jobs" ? "text-blue-600":"text-gray-500"} flex flex-col items-center `}>
            <PiBagSimpleBold className='w-5 h-5 '/>
            <h2 className='text-[12px] font-semibold '>Jobs</h2>
        </span>
        <span onClick={()=>navigate("/profile/saved-jobs")} className={`${location.pathname === "/profile/saved-jobs" ? "text-blue-600":"text-gray-500"} flex flex-col items-center `}>
            <BiHeart className='w-5 h-5 '/>
            <h2 className='text-[12px] font-semibold '>Saved</h2>
        </span>
        <span onClick={()=>navigate("/profile")} className={`${location.pathname === "/profile" ? "text-blue-600":"text-gray-500"} flex flex-col items-center `}>
            <MdOutlinePerson className='w-5 h-5 '/>
            <h2 className='text-[12px] font-semibold '>Profile</h2>
        </span>
        

    </main>) :null
    }
   
</>
  )
}

export default mobNavigation