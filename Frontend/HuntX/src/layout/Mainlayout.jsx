import Navbar from '@/components/sharedComponents/Navbar'
import Footer from '@/pages/Footer'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Mainlayout = () => {
  return (
    <>
    <main className='2xl:max-w-7xl mx-auto'>

      <Navbar />
      <div> 
        <Outlet />
      </div>
      <Footer />
    </main>
    </>
  )
}

export default Mainlayout