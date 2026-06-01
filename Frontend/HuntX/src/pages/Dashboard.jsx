import AppSidebar from '@/components/sharedComponents/AppSidebar'
import Navbar from '@/components/sharedComponents/Navbar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
  <>
    <Navbar />
    <SidebarProvider >
       <main className='flex overflow-hidden min-h-screen  w-full'>


        <AppSidebar/>

        <SidebarInset>
          <Outlet/>
        </SidebarInset>


      </main>
    </SidebarProvider>
  </>
  )
}

export default Dashboard