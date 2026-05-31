import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/constants/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authslice'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
const Signup = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(store=>store.auth);
  const [input , setInput] = useState({
    email:"",
    password:"",
    firstname:"",
    role:""
  })

  const onChangehandler = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  const navigate = useNavigate();

  const handle = async(e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`,input,{
       
        withCredentials:true,
      });
      if(res.data.success){
        navigate("/login");
        toast("Signed In successfully");
      }
    } catch (error) {
       toast.error(error.response?.data?.message || "Signup failed");
        console.log(error);
             
    }
    finally{
      dispatch(setLoading(false));
    }
    
  }
  return (
    <>
      <main  className='max-sm:p-3 flex justify-center items-center mt-5 mb-5'>
        <form onSubmit={handle}  className='p-4 flex flex-col gap-4  items-center bg-white shadow-blue-300 shadow-lg rounded-md w-120'>
          <div className='text-black text-3xl font-medium'>Sign<span className='text-blue-500'>Up</span></div>
          

            <div className='flex flex-col w-full'>
              <label htmlFor="Name">Full Name</label>
              <input required name='firstname' value={input.firstname} onChange={onChangehandler} type="text" id='Name' placeholder='Your Name' className='p-1  border-2 border-solid border-blue-200 outline-blue-400 rounded-sm placeholder:text-gray-300' />
            </div>
          
          <div className='flex flex-col w-full'>
            <label htmlFor="Email">Email</label>
            <input required name='email' value={input.email} onChange={onChangehandler} type="email" id='Email' placeholder='Your Email' className='p-1  border-2 border-solid border-blue-200 outline-blue-400 rounded-sm placeholder:text-gray-300' />
          </div>
          <div className='flex flex-col w-full'>
            <label htmlFor="Password">Password</label>
            <input required name='password' value={input.password} onChange={onChangehandler} type="password" id='Password' placeholder='Your Password' className='p-1  border-2 border-solid border-blue-200 outline-blue-400 rounded-sm placeholder:text-gray-300' />
          </div>

          <div className='flex gap-4 self-start'>
            <section className='flex items-center gap-2'>
              <input required name='role'   checked={input.role === "student"} value='student' onChange={onChangehandler} id='Student' type="radio" />
              <label htmlFor='Student'>Student</label>
            </section>
            <section className='flex items-center gap-2'>
              <input required name='role'   checked={input.role === "recruiter"} value='recruiter' onChange={onChangehandler} id='Recruiter' type="radio" />
              <label htmlFor='Recruiter'>Recruiter</label>
            </section>
          </div>
        {
          loading?<button className='bg-blue-600 hover:bg-blue-700 p-2 cursor-pointer text-white w-full rounded-md flex justify-center items-center '> <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</button>: <button type='submit' className='bg-blue-600 hover:bg-blue-700 p-2 cursor-pointer text-white w-full rounded-md'>Sign Up</button>
        }
          {/* <button type='submit' className='bg-blue-600 hover:bg-blue-700 p-2 cursor-pointer text-white w-full rounded-md'>Sign Up</button> */}

          <p className='self-start'>Already have an account ? <Link to='/login'><span  className='text-blue-600 cursor-pointer'>Login</span></Link></p>

        </form>
      </main>
    </>
  )
}

export default Signup