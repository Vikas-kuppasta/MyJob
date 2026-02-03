import { USER_API_END_POINT } from '@/constants/constant'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authslice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const dispatch = useDispatch();
    const {loading} = useSelector(store=>store.auth);

    const [input , setInput] = useState({
      email:"",
      password:"",
      role:"",
      
    })
  
    const onChangehandler = (e)=>{
      setInput({...input,[e.target.name]:e.target.value})
    }
    
    const navigate = useNavigate();

    const handle = async(e) => {
      e.preventDefault();
      try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/login`,input,{
          
          withCredentials:true,
        });
        if(res.data.success){
          dispatch(setUser(res.data.user));
          navigate("/");
          alert("signed");
        }
      } catch (error) {
        alert(error.response?.data?.message || "login failed");
        console.log(error);
      }
      finally{
        dispatch(setLoading(false));
      }
    }
  return (

<>
       <main  className=' mt-5 mb-5 flex justify-center items-center'>
        <form onSubmit={handle} onClick={(e) => e.stopPropagation()} className='p-4 flex flex-col gap-4  items-center bg-white shadow-blue-300 shadow-lg rounded-md w-120'>
          <div className='text-black text-3xl font-medium'>Log<span className='text-blue-500'>In</span></div>
          
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
              <input name='role'   checked={input.role === "student"} value='student' onChange={onChangehandler} id='Student' type="radio" />
              <label htmlFor='Student'>Student</label>
            </section>
            <section className='flex items-center gap-2'>
              <input name='role'   checked={input.role === "recruiter"} value='recruiter' onChange={onChangehandler} id='Recruiter' type="radio" />
              <label htmlFor='Recruiter'>Recruiter</label>
            </section>
          </div>
        {
          loading?<button className='bg-blue-600 hover:bg-blue-700 p-2 cursor-pointer text-white w-full rounded-md flex justify-center items-center '> <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</button>: <button type='submit' className='bg-blue-600 hover:bg-blue-700 p-2 cursor-pointer text-white w-full rounded-md'>LogIn</button>
        }
         

          <p className='self-start'>Don't have an account ? <Link to='/signup'><span  className='text-blue-600 cursor-pointer'>Sign Up</span></Link></p>

        </form>
      </main>
</>
  )  
}

export default Login