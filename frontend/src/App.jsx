import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SigNup from './pages/SigNup'
import SingIn from './pages/SingIn'
function App() {
  return (
    <div className="text-3xl font-bold  text-red-500">
      app
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sigNup" element={<SigNup />} />
          <Route path="/singIn" element={<SingIn />} />
        </Routes>
     
    </div>
  )
}

export default App
