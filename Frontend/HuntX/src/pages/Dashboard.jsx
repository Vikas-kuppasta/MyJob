import AppSidebar from '@/components/sharedComponents/AppSidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <SidebarProvider >
       <main className='flex overflow-hidden h-screen  w-full'>


        <AppSidebar/>

        <SidebarInset>
          <Outlet/>
        </SidebarInset>


      </main>
    </SidebarProvider>
  )
}

export default Dashboard