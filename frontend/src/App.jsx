import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SigNup from './pages/SigNup'
import SingIn from './pages/SingIn'
import Header from './componets/Header'
import PriveRoute from './componets/PriveRoute'
function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
     
          <Route path="/sigNup" element={<SigNup />} />
          <Route path="/login" element={<SingIn />} />
          <Route element={<PriveRoute />}>
     <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </div>
  ) 
}

export default App
