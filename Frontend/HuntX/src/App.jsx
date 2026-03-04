import { useState } from 'react'

import './App.css'
import Navbar from './components/sharedComponents/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './pages/Footer'
import Jobs from './pages/jobs'
import Profile from './pages/profile'
import Job from '../src/components/smallComponents/job'
import JobDescription from './pages/JobDescription'
import { Toaster } from './components/ui/sonner'
function App() {


  return (
    <>
    
  <Navbar  />
    <Routes>
      <Route path='' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='profile' element={<Profile/>}/>

      <Route path='/jobs' element={<Jobs/>}>
        <Route index element={<Job/>}/>
        <Route path='description/:id' element={<JobDescription/>}/>
      </Route>
      
    </Routes>
    <Toaster position="top-center" />
  <Footer/>

      


    </>
  )
}

export default App
