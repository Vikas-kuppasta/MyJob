import { useState } from 'react'

import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Profile from './pages/Profile'
import Job from './components/smallComponents/Job'
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
import Protected from './admin/protected'
import JobApplicants from './pages/JobApplicants'
import ViewCompanyJobs from './pages/ViewCompanyJobs'
import EditCompany from './pages/EditCompany'
import EditJob from './pages/EditJob'
import ProtectedUser from './admin/ProtectedUser'
function App() {


  return (
    <>
    
  
  <Routes>
    <Route element={<Mainlayout />}>
      <Route path='/' element={<Home /> } />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/profile' element={<ProtectedUser><UserDashboardHome/></ProtectedUser> }>
        <Route index element={<Profile/>}/>
        <Route path="applications" element={<UserApplications/>}/>
        <Route path="saved-jobs" element={<UserSavedJobs/>}/>
      </Route>

      <Route path='/jobs' element={<ProtectedUser><Jobs /></ProtectedUser> }>
        <Route index element={<Job />} />
        <Route path='description/:id' element={<JobDescription />} />
      </Route>
    </Route>

    

      <Route path='/adminDashboard' element={<Protected><Dashboard/></Protected>}>
        <Route index element={<DashboardHome/>}/>
        <Route path='mycompanies' element={<MyCompanies/>}/>
        <Route path='mycompanies/jobs/:id' element={<ViewCompanyJobs/>}/>
        <Route path='mycompanies/job/:id' element={<EditCompany/>}/>
        <Route path='postcompany' element={<PostCompany/>}/>
        <Route path='myjobs' element={<MyJobs/>}/>
        <Route path='myjobs/:id' element={<EditJob/>}/>
        <Route path='postjob' element={<Postjobs/>}/>
        <Route path='myjobs/applicants/:id' element={<JobApplicants/>}/>
      </Route>
    
      
    </Routes>
    <Toaster position="top-center" />
  

      


    </>
  )
}

export default App
