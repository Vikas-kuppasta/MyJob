import { useState } from 'react'

import './App.css'
import Navbar from './components/sharedComponents/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './pages/Footer'
import Jobs from './pages/jobs'
function App() {


  return (
    <>
    
  <Navbar  />
    <Routes>
      <Route path='' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/jobs' element={<Jobs/>}/>
    </Routes>
  <Footer/>

      


    </>
  )
}

export default App
