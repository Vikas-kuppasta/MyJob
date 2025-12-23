
import React, { useState } from 'react'

const Signup = ({Login,SetLogin}) => {
  const [Signup, SetSignup] = useState(false);
  const [input , setInput] = useState({
    email:"",
    password:"",
    name:""
  })

  const onChangehandler = (e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }

  const handle = (e) => {
    e.preventDefault();
    console.log(input);
    SetLogin(!Login);
    alert('Signes')
    
  }
  return (
    <>
      <main onClick={()=>SetLogin(!Login)} className='z-9 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/70'>
        <form onSubmit={handle} onClick={(e) => e.stopPropagation()} className='p-4 flex flex-col gap-4  items-center bg-white shadow-blue-300 shadow-lg rounded-md w-120'>
          <div className='text-black text-3xl font-medium'>{Signup ? "Sign" : "Log"}<span className='text-blue-500'>{Signup ? " Up" : "In"}</span></div>
          {Signup && (

            <div className='flex flex-col w-full'>
              <label htmlFor="Name">Full Name</label>
              <input required name='name' value={input.name} onChange={onChangehandler} type="text" id='Name' placeholder='Your Name' className='p-1  border-2 border-solid border-blue-200 outline-blue-400 rounded-sm placeholder:text-gray-300' />
            </div>
          )}
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
              <input id='Student' type="radio" />
              <label htmlFor='Student'>Student</label>
            </section>
            <section className='flex items-center gap-2'>
              <input id='Recruiter' type="radio" />
              <label htmlFor='Recruiter'>Recruiter</label>
            </section>
          </div>

          <button type='submit' className='bg-blue-600 hover:bg-blue-700 p-2 cursor-pointer text-white w-full rounded-md'>{Signup ? "Sign Up" : "LogIn"}</button>

          <p className='self-start'>{Signup ? "Already have an account ? " : "Don't have an account ? "} <span onClick={() => SetSignup(!Signup)} className='text-blue-600 cursor-pointer'>{Signup ? "Login" : "Sign Up"}</span> </p>

        </form>
      </main>
    </>
  )
}

export default Signup