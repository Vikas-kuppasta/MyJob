import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo1.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoPersonSharp } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import {toast} from "sonner"
import axios from 'axios'
import { USER_API_END_POINT } from '@/constants/constant'
import { setUser } from '@/redux/authslice'
import { img } from 'framer-motion/client'
import DropdownBox from '../smallComponents/DropdownBox'
import { DropdownMenuTrigger } from '../ui/dropdown-menu'
const Navbar = () => {
    
    const navigate = useNavigate();
    const dispatch =  useDispatch();
    const location = useLocation();
    
    const {user} = useSelector(store=>store.auth);
    
    return (
        <main className={`${location.pathname.startsWith("/adminDashboard") ? "md:hidden" :null} sticky top-0 bg-white z-6 px-3 py-2  flex justify-between items-center`}>

            <Link to='' > <img src={logo} className='max-sm:w-25 w-40' alt="" /> </Link>
            <div className='flex items-center gap-8'>
                {user?.role === "student" ? (
                    <ul className='flex items-center max-sm:hidden gap-16'>
                        <li className='text-black list-none'><Link to=''>Home</Link></li>
                        <li className='text-black list-none'><Link to='/jobs'>Jobs</Link></li>
                        
                    </ul>
                    ) : null}


                {!user ? (
                    <div className='flex  gap-3 items-center'>
                        
                        <button onClick={()=>{navigate("/login");window.scrollTo(0,0)}} className='p-2 px-4 max-sm:p-1 max-sm:px-2 cursor-pointer  text-black rounded-md border border-solid max-sm:text-[10px]'>Login</button>
                        <button onClick={()=>{navigate("/signup");window.scrollTo(0,0)}} className='p-2 px-4 cursor-pointer  text-white rounded-md bg-blue-500 max-sm:p-1 max-sm:px-2 max-sm:text-[10px] '>SignUp</button>
                    </div>
                ) : (
                    <>
                    
                    <div className={`${user.role ==="recruiter" ? "max-sm:hidden" : null}`}>

                    <DropdownBox />
                    </div>
                    
                       
                    </>
                        
                )}
            </div>

        </main>
    )
}

export default Navbar