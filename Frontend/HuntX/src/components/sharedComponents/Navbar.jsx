import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo1.png'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoPersonSharp } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

const Navbar = () => {
    const[open,setopen] = useState(false);
    const navigate = useNavigate();
    // const user = false;
    const {user} = useSelector(store=>store.auth);
    return (
        <main className='sticky top-0 bg-white z-6 px-3 py-2 border-b border-solid border-gray-300 flex justify-between items-center'>

            <Link to='' > <img src={logo} className='w-40' alt="" /> </Link>
            <div className='flex items-center gap-8'>

                <ul className='flex items-center gap-16'>
                    <li className='text-black '><Link to=''>Home</Link></li>
                    <li className='text-black '><Link to='/jobs'>Jobs</Link></li>
                    <li className='text-black '><Link>Browse</Link></li>
                </ul>


                {!user ? (
                    <div className='flex gap-3 items-center'>
                        
                        <button onClick={()=>{navigate("/login");window.scrollTo(0,0)}} className='p-2 px-4 cursor-pointer  text-black rounded-md border border-solid'>Login</button>
                        <button onClick={()=>{navigate("/signup");window.scrollTo(0,0)}} className='p-2 px-4 cursor-pointer  text-white rounded-md bg-blue-500'>SignUp</button>
                    </div>
                ) : (
                    <>
                        <div onClick={()=>(setopen(!open))} className='w-10 h-10 overflow-hidden cursor-pointer rounded-full '>
                            <IoPersonSharp className='text-gray-200 object-cover w-full h-full '/>
                        </div>
                        {
                            open&& (<div className='bg-white border border-gray-100 border-solid p-2 rounded-md w-50 shadow-xl shadow-blue-300  flex flex-col gap-3 absolute position right-4 top-16'>

                        <div className='flex gap-3 items-center'>
                            <div  className='w-10 h-10 overflow-hidden cursor-pointer rounded-full '>
                            <IoPersonSharp className='text-gray-200 object-cover w-full h-full '/>
                            </div>
                                    <p>Aditro</p>
                        </div>

                        <div className='flex gap-3 items-center'>
                            <IoPersonSharp className='h-5 w-5'/>
                            <p>view profile</p>
                        </div>

                        <div className='flex gap-3 items-center'>
                            <TbLogout className='h-5 w-5'/>
                            <p>Logout</p>
                        </div>



                            </div>)
                        }
                    </>
                        
                )}
            </div>

        </main>
    )
}

export default Navbar