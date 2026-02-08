import React from 'react'
import { LuPencil } from "react-icons/lu";
import banner from '../../public/banner.jpg'
import { useRef } from 'react';
import defaultLogo from "../../public/Defaultuserlogo.png"
import { useState } from 'react';
import AppliedJobTable from '@/components/smallComponents/AppliedJobTable';
const profile = () => {
  const fileref = useRef(null);
  const userLogo = useRef(null);
  const [image , setImage] = useState(banner)
  const [Logoimage , setLogoImage] = useState(defaultLogo)

  const handleImageChange = (e) => {
   const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const handleUserLogoImageChange = (e) => {
   const file = e.target.files[0];
    if (file) {
      setLogoImage(URL.createObjectURL(file));
    }
  };
  return (
<>
    <main className='flex flex-col gap-2 items-center py-5 '>

      <div className=' w-full max-w-4xl    border border-solid rounded-md border-gray-300'>
        {/* <------------------------userBanner code start---------------------> */}
        <div className='h-46 w-full relative '> 
          <img className='w-full h-37 rounded-tl-md rounded-tr-md  object-cover' src={image}/>
           <button onClick={()=>fileref.current.click()} className='bg-white/90 cursor-pointer absolute top-2 right-2 w-10 h-10 flex justify-center items-center rounded-full  '>
            <LuPencil className='w-8 h-7 text-blue-500'/>
           </button>
           <input type="file"  onChange={handleImageChange}
          accept="image/*" ref={fileref} className='hidden'  />

          {/* <--------------------------userBanner code end-----------------------> */}

          {/* <------------------- userlogo code start-------------------------> */}
        <div className='group w-30 h-30 bg-blue-300 overflow-hidden absolute top-13 left-5 rounded-full '>
          <img src={Logoimage} className='w-full h-full object-cover' alt="" />
          <button onClick={()=>userLogo.current.click()} className='bg-white/90 cursor-pointer absolute top-10 left-10  w-10 h-10 hidden group-hover:flex justify-center items-center rounded-full  transition-all duration-200  '>
            <LuPencil className='w-8 h-7 text-gray-500'/>
          </button>
          <input type="file"  onChange={handleUserLogoImageChange}
          accept="image/*" ref={userLogo} className='hidden'  />
        </div>
        {/* <-----------------------userlogo code end-----------------------> */}

      </div>


        <div className='h-20  px-4'>
          <h1 className='text-xl font-semibold'>Jon Doe</h1>
          <p> Bio
          </p>
        </div>

      </div>

        <div className='  rounded-md border   w-full max-w-4xl'>
          <h1 className='text-2xl font-semibold m-2'>Applied Jobs</h1>
          <div className='  mt-2  w-full max-w-4xl'>
              <AppliedJobTable/>
          </div>
        </div>
    </main>
</>
  )
}

export default profile