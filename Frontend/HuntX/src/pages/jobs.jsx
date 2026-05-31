import React, { useEffect, useState } from 'react'
import Filter from '../components/smallComponents/filtersection'
import { Outlet } from 'react-router-dom'

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