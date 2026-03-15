import React from 'react'
import { LuPencil } from "react-icons/lu";
import banner from '../../public/banner.jpg'
import { useRef } from 'react';
import defaultLogo from "../../public/Defaultuserlogo.png"
import { useState } from 'react';
import AppliedJobTable from '@/components/smallComponents/AppliedJobTable';
import { MdEmail } from "react-icons/md";
import { Badge } from '@/components/ui/badge';
import UpdateProfile from '@/components/smallComponents/UpdateProfile';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/constants/constant';
import { setUser } from '@/redux/authslice';
import { toast } from 'sonner';
import axios from 'axios';

const profile = () => {
  const [open , setOpen] = useState(false);
  const fileref = useRef(null);
  const userLogo = useRef(null);
  const {user} = useSelector(store=>store.auth);
  const dispatch = useDispatch();
  
  const[input,setInput] = useState({
    profile:user?.profile?.profilePhoto || "" ,
    banner:user?.profile?.profileBanner || "",
  });

  const image = input.banner|| banner;
  const Logoimage = input.profile || defaultLogo;

  const handleImageChange = async(e) => {
    const name = e.target.name;
    const file = e.target.files?.[0];
    setInput({...input,[name]:file});
    try {
      const formData = new FormData();
      formData.append(name,file);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update/image`,formData,{
        headers:{
          "Content-Type":"multipart/form-data",
        },
        withCredentials:true
      });

      
      if(res.data.success){
        dispatch(setUser(res.data.user));
        toast("Profile updated successfully")
      }
    } catch (error) {
      console.log(error)
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
           <input type="file" name='banner' onChange={handleImageChange}
          accept="image/*" ref={fileref} className='hidden'  />

          {/* <--------------------------userBanner code end-----------------------> */}

          {/* <------------------- userlogo code start-------------------------> */}
        <div className='group w-30 h-30 bg-blue-300 overflow-hidden absolute top-13 left-5 rounded-full '>
          <img src={Logoimage} className='w-full h-full object-cover' alt="" />
          <button onClick={()=>userLogo.current.click()} className='bg-white/90 cursor-pointer absolute top-10 left-10  w-10 h-10 hidden group-hover:flex justify-center items-center rounded-full  transition-all duration-200  '>
            <LuPencil className='w-8 h-7 text-gray-500'/>
          </button>
          <input type="file" name='profile'  onChange={handleImageChange}
          accept="image/*" ref={userLogo} className='hidden'  />
        </div>
        {/* <-----------------------userlogo code end-----------------------> */}

      </div>

        <div className='flex justify-between p-2 '>

         <div className=' flex flex-col gap-3  w-fit px-4'>
          <div>
           <h1 className='text-xl font-semibold'>{user?.firstname}</h1>
           <p>{user?.profile?.bio}</p>
          </div>

          <div className='flex gap-2 items-center'>
            <MdEmail className='text-blue-600 w-5 h-5'/>
            <p>{user?.email}</p>
          </div>

          <div>
            <h3 className='text-lg font-semibold '>Skills</h3>
            <div className='flex gap-2  flex-wrap w-100 mt-1'>
              {
                user?.profile?.skills.length!==0 ? user?.profile?.skills.map((item,index)=>(<Badge className="bg-blue-600 w-25 text-md" key={index}>{item}</Badge>)) : <span>Na</span>
              }
            </div>
          </div>
         </div>
         <button onClick={()=>(setOpen(!open))} className='w-fit h-fit cursor-pointer p-2 rounded-full bg-gray-100 text-blue-400'>
          <LuPencil className='w-6 h-6'/>
         </button>
        </div>

      </div>

        <div className='  rounded-md border   w-full max-w-4xl'>
          <h1 className='text-2xl font-semibold m-2'>Applied Jobs</h1>
          <div className='  mt-2  w-full max-w-4xl'>
              <AppliedJobTable/>
          </div>
        </div>

        <UpdateProfile open={open} setOpen={setOpen}/>
    </main>
</>
  )
}

export default profile