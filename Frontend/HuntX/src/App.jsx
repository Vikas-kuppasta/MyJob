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
import Dashboard from './pages/Dashboard'
import DashboardHome from './pages/DashboardHome'
import Mainlayout from './layout/Mainlayout'
import MyCompanies from './pages/MyCompanies'
import PostCompany from './pages/PostCompany'
import MyJobs from './pages/MyJobs'
import Postjobs from './pages/Postjobs'
import UserDashboardHome from './pages/UserDashboard'
import UserApplications from './pages/UserApplications'
import UserSavedJobs from './pages/UserSavedJobs'
function App() {


  return (
    <>
    
  
  <Routes>
    <Route element={<Mainlayout />}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/profile' element={<UserDashboardHome/>}>
        <Route index element={<Profile/>}/>
        <Route path="applications" element={<UserApplications/>}/>
        <Route path="saved-jobs" element={<UserSavedJobs/>}/>
      </Route>

      <Route path='/jobs' element={<Jobs />}>
        <Route index element={<Job />} />
        <Route path='description/:id' element={<JobDescription />} />
      </Route>
    </Route>

      <Route path='/adminDashboard' element={<Dashboard/>}>
        <Route index element={<DashboardHome/>}/>
        <Route path='mycompanies' element={<MyCompanies/>}/>
        <Route path='postcompany' element={<PostCompany/>}/>
        <Route path='myjobs' element={<MyJobs/>}/>
        <Route path='postjob' element={<Postjobs/>}/>
      </Route>
      
    </Routes>
    <Toaster position="top-center" />
  

      


    </>
  )
}

export default App
