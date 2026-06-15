import UserSideBar from '@/components/sharedComponents/UserSideBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const UserDashboardHome = () => {
  return (
<>
    <main className=" w-full max-sm:p-3 p-5 bg-blue-50/40 flex ">
    <div className='sticky top-0'>
      <UserSideBar/>
    </div>
    <div className='flex-1 min-w-0'>
      <Outlet/>
    </div>

    </main>
</>
  )
}

export default UserDashboardHome