import React, { useEffect, useState } from 'react'
import Filter from '../components/smallComponents/filtersection'
import { Outlet } from 'react-router-dom'
import jbanner from './../assets/jb1.png'

const jobs = () => {
  const[filters,setFilters] = useState({
    location:"",
    industry:"",
    minSalary:"",
    maxSalary:"",
    keyword:"",
  });
  
  
  return (
<>
    <div className='relative max-sm:hidden '>
      <img className='' src={jbanner} alt="" />
      <h1 className='absolute top-6 left-6 font-semibold text-4xl flex'>Find the right job,<p className='font-semibold text-4xl text-blue-400'>faster.</p></h1>
    </div>
    <main className='bg-blue-50/30 p-3 flex w-full'>
        {/* filter section */}
        <Filter filters={filters} setFilters={setFilters}/>
        {/* Jobs section */}
        <Outlet context={{filters,setFilters}} />
    </main>
</>
  )
}

export default jobs