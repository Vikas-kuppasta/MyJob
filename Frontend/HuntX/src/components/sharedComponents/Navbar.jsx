import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = ({Login,SetLogin}) => {
    const user = false;
    return (
        <main className=' px-3 py-3 bg-gray-50 flex justify-between items-center'>
            <div className='text-black font-medium text-4xl'>My<span className='text-blue-400 '>Job</span></div>
            <div className='flex gap-8'>

                <ul className='flex items-center gap-16'>
                    <li className='text-black '><Link>Home</Link></li>
                    <li className='text-black '><Link>Jobs</Link></li>
                    <li className='text-black '><Link>Browse</Link></li>
                </ul>


                {!user ? (
                 <button onClick={()=>SetLogin(!Login)} className='p-2 px-4 cursor-pointer  text-white rounded-md bg-blue-500'>SignUp</button>
                ) : (
                    <h1 className='text-white'>hello</h1>
                )}
            </div>

        </main>
    )
}

export default Navbar