import React, { useState } from 'react'

const Signup = ({Login,SetLogin}) => {
  const [Signup, SetSignup] = useState(false);
  const handle = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <main onClick={()=>SetLogin(!Login)} className='z-2 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/70'>
        <form onSubmit={handle} onClick={(e) => e.stopPropagation()} className='p-4 flex flex-col gap-4  items-center bg-white shadow-blue-300 shadow-lg rounded-md w-120'>
          <div className='text-black text-3xl font-medium'>{Signup ? "Sign" : "Log"}<span className='text-blue-500'>{Signup ? " Up" : "In"}</span></div>
          {Signup && (

            <div className='flex flex-col w-full'>
              <label for="Name">Full Name</label>
              <input required type="text" id='Name' placeholder='Your Name' className='p-1  border-2 border-solid border-blue-200 outline-blue-400 rounded-sm placeholder:text-gray-300' />
            </div>
          )}
          <div className='flex flex-col w-full'>
            <label for="Email">Email</label>
            <input required type="text" id='Email' placeholder='Your Email' className='p-1  border-2 border-solid border-blue-200 outline-blue-400 rounded-sm placeholder:text-gray-300' />
          </div>
          <div className='flex flex-col w-full'>
            <label for="Password">Password</label>
            <input required type="text" id='Password' placeholder='Your Password' className='p-1  border-2 border-solid border-blue-200 outline-blue-400 rounded-sm placeholder:text-gray-300' />
          </div>

          <div className='flex gap-4 self-start'>
            <section className='flex items-center gap-2'>
              <input id='Student' type="radio" />
              <label for='Student'>Student</label>
            </section>
            <section className='flex items-center gap-2'>
              <input id='Recruiter' type="radio" />
              <label for='Recruiter'>Recruiter</label>
            </section>
          </div>

          <button className='bg-blue-600 hover:bg-blue-700 p-2 cursor-pointer text-white w-full rounded-md'>{Signup ? "Sign Up" : "LogIn"}</button>

          <p className='self-start'>{Signup ? "Already have an account ? " : "Don't have an account ? "} <span onClick={() => SetSignup(!Signup)} className='text-blue-600 cursor-pointer'>{Signup ? "Login" : "Sign Up"}</span> </p>

        </form>
      </main>
    </>
  )
}

export default Signup