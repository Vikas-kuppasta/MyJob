import AppSidebar from '@/components/sharedComponents/AppSidebar'
import Navbar from '@/components/sharedComponents/Navbar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
  <>
  {/* v */}
    <Navbar />
    <SidebarProvider >
       <main className=' flex  min-h-screen  w-full'>


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