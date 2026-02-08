import React from 'react'
import Filter from '../components/smallComponents/filtersection'
import { Outlet } from 'react-router-dom'
const jobs = () => {
  return (
<>
    <main className='flex w-full'>
        {/* filter section */}
        <Filter/>
        {/* Jobs section */}
        <Outlet />
    </main>
</>
  )
}

export default jobs