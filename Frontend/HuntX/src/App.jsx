import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/sharedComponents/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Herosection from './pages/Herosection'

function App() {
const [Login,SetLogin] = useState(false);

  return (
    <>
    {Login && (
      <Signup Login={Login} SetLogin={SetLogin}/>
    )}
      <Navbar Login={Login} SetLogin={SetLogin} />
      <Herosection/>

    </>
  )
}

export default App
