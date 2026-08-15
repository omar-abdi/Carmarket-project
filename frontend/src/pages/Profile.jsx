import React, { useState, useRef } from "react";
import { Camera, Eye, EyeOff, User, Mail, Lock, LogOut, Trash2 } from "lucide-react";
import axios from "axios"
import { useAppContext } from "../context/AppContext";
import {toast , ToastContainer} from 'react-toastify'
import { Link } from "react-router-dom";
function Profile() {
  const { currentUser  , updateSuccess, updateFailure, updateInStart , deleteUserInStart , deleteUserSuccess } = useAppContext();
  const [Image, setImage] = useState(null);
  const [Uploading , setUploading] = useState(false)
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // consle log
 
  const [showPassword, setShowPassword] = useState(false);
  const fileInput = useRef(null);

  const handlefille = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }
 setUploading(true);
    toast.info("Uploading...");
    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "upload_preset");
    data.append("api_key", import.meta.env.CLOUDINARY_API);

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/douofotna/image/upload",
      {
        method: "POST",
        body: data,
        
      }
    );

    const result = await response.json();
    setImage(result?.secure_url || result?.url || "");
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    updateInStart();

    const res = await axios.put(
      `http://localhost:8000/api/auth/update/${currentUser._id}`, formData,

     
      {
        withCredentials: true,
      }
    );

    const data = res.data;

    if (data.success) {
      updateSuccess(data.data);
      toast.success("Profile updated successfully")
    } else {
      updateFailure(data.message);
    }

  } catch (error) {
    console.log(error.response?.data || error.message);
    toast.error("Something went wrong")

    updateFailure(
      error.response?.data?.message || error.message
    );
  }
};

Uploading &&  toast.info("Uploading...")

const handleDelete = async (e)=>{
  try{
    deleteUserInStart()
    const res = await axios.delete(`http://localhost:8000/api/auth/delete/${currentUser._id}` , {
      withCredentials: true,
    })

  
    localStorage.removeItem("current-user-data")



    const data = res.data;
    if(data.success){
      deleteUserSuccess()
     
      toast.success("Profile deleted successfully")
      navigate("/dashboard")
    }
     
   
  }catch(err){
    console.log(err.message)
  }
}

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8">

        <form  onSubmit={handleSubmit} className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800">
              Edit Profile
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Update your photo and personal details
            </p>
          </div>

          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative group">
              <input onChange={handlefille} type="file" ref={fileInput} hidden />

              <img
                alt="profile"
                src={Image ? Image : currentUser?.avatar}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-50 cursor-pointer transition-transform duration-200 group-hover:scale-105"
                onClick={() => fileInput.current.click()}
              />

              <div
                onClick={() => fileInput.current.click()}
                className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <Camera
                  size={20}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>

              <button
                type="button"
                onClick={() => fileInput.current.click()}
                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors ring-2 ring-white"
              >
                <Camera size={14} />
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Full Name
              </label>

              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                
                  id="name"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  defaultValue={currentUser.username}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="you@example.com"
                  defaultValue={currentUser.email}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
          >
            Update Profile
          </button>

          {/* Delete / Logout */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <span className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 cursor-pointer transition-colors">
          
   <button onClick={handleDelete} className="w-full bg-red-600 text-white font-medium py-2.5 rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors">
    <Trash2 size={50} /> 
   </button>
            </span>

            <span className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 cursor-pointer transition-colors">
              <LogOut size={14} />
              Logout
            </span>
          </div>
        </form>
        <Link to="/listing/:id">
          <button
            type="button"
            className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
          >
            View your cars
          </button>
        </Link>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Profile;