import React from 'react'
import JobCard from '../smallComponents/jobCard'
const job = () => {
  return (
<>
    <main className='border-l-2 bg-blue-50 p-6 w-full border-l-gray-200 border-solid h-screen  grid grid-cols-3 gap-4 '>
        {/* <h1 className='bg-black w-30'>jarvis</h1> */}
        <JobCard/>
        <JobCard/>
        <JobCard/>
        
    </main>
</>
  )
}

export default job