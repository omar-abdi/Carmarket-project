import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useAppContext} from '../context/AppContext.jsx'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {toast , ToastContainer} from 'react-toastify'
import { LogIn } from 'lucide-react'
function Singin() {
    const {
      signInStart 
      , signInSuccess , 
      signInFailure ,
      loading , 
      currentUser,
    
      error} = useAppContext()
  const navigate = useNavigate()
  const [formData , setFormData] = useState({
   
    email :"",
    password:""
  })

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }
  const handleSubmit = async (e)=>{

    e.preventDefault()
    if(!formData.email || !formData.password){
      toast.error('Please fill all the fields')
      return
    }
    


   try{
 signInStart()
     const res = await axios.post('http://localhost:8000/api/users/login' , formData)
    const data =   await res.data
    if(data.success){
      toast.success("You are logged in")
         signInSuccess(data.data)
         
      navigate('/')
      setFormData({
     
        email :"",
        password:""
      })
  
    
    }
   }catch(error){
     toast.error(error.message)
     signInFailure(error.message)

   }
  } 

  currentUser && console.log(currentUser)


  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-4">
  <div className="bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
    <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      Sign In
    </h1>
    <p className="text-center text-slate-500 text-sm mb-6">
      Log in to your account
    </p>

    <form className="space-y-4" onSubmit={handleSubmit}>
      

      <input
        type="email"
        id="email"
         onChange={handleChange}
        placeholder="Email"
        className="w-full border border-slate-200 p-3.5 rounded-xl outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-slate-400"
      />

      <input
        type="password"
        id="password"
         onChange={handleChange}
        placeholder="Password"
        className="w-full border border-slate-200 p-3.5 rounded-xl outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-slate-400"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 active:scale-[0.98]"
      >
        Sign In
      </button>
    </form>

    <p className="text-center text-sm text-slate-500 mt-6">
      Don't have an account?{" "}
      <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
       < Link to="/signup">
        Sign Up
       </Link>
      </span>
    </p>
  </div>
  <ToastContainer/>
</div>
  )
}

export default Singin
