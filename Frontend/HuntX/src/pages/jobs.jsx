import React from 'react'
import Filter from '../components/smallComponents/filtersection'
import Job from '../components/smallComponents/job'
const jobs = () => {
  return (
<>
    <main className='flex'>
        {/* filter section */}
        <Filter/>
        {/* Jobs section */}
        <Job/>
    </main>
</>
  )
}

export default jobs