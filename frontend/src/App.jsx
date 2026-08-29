import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SigNup from './pages/SigNup'
import SingIn from './pages/SingIn'
import Header from './componets/Header'
import PriveRoute from './componets/PriveRoute'
import CarListing from './pages/CarListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import AllListing from './pages/AllListing'
import VeiwList from './pages/VeiwList'
import DashboardLayout from './pages/DashboardLayout'
import About from './pages/About'
import MyListings from './pages/MyListings'
function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
     
          <Route path="/sigNup" element={<SigNup />} />
          <Route path="/login" element={<SingIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/allListing" element={<AllListing />} />
          <Route path="/view/:id" element={<VeiwList />} />
          <Route element={<PriveRoute />}>
     <Route path="/profile" element={<Profile />} />
           
         
         
              
            <Route
              path="/dashboard"
              element={<DashboardLayout />}
            >

              <Route path="/dashboard/profile" element={<Profile />} />
               <Route path="/dashboard/carListing" element={<CarListing />} />
                    <Route path="/dashboard/listing/:id" element={<Listing />} />
                       <Route path="/dashboard/updateListing/:id" element={<UpdateListing />} />
                       <Route path="/dashboard/myListings" element={<MyListings />} /> 
            </Route>








              
          </Route>
        </Routes>
      </main>
    </div>
  ) 
}

export default App
