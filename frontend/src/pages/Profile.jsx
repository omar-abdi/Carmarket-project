import React, { useState, useRef } from "react";
import { ArrowLeft, Camera, Check, Eye, EyeOff, User, Mail, Lock, LogOut, ShieldCheck, Trash2 } from "lucide-react";
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
      `http://localhost:8000/api/auth/update/${currentUser._id}`, 
      {
        ...formData,
        avatar: Image || currentUser?.avatar
      },
      {
        withCredentials: true
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
    toast.error(error.response?.data?.message || error.message || "Something went wrong")

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
    <main className="min-h-screen bg-[#f5f2ec] px-4 py-8 text-[#202329] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Link to="/dashboard" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#626873] transition-colors hover:text-[#202329]">
          <ArrowLeft size={17} /> Back to dashboard
        </Link>

        <div className="grid overflow-hidden border border-[#dedbd4] bg-white shadow-[0_24px_70px_rgba(32,35,41,0.10)] lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="relative overflow-hidden bg-[#202329] px-7 py-9 text-white sm:px-10 lg:px-12 lg:py-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[36px] border-[#f5a623]/20" />
            <div className="relative flex h-full flex-col justify-between gap-12">
              <div>
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5a623] text-[#202329]">
                  <User size={22} strokeWidth={2.5} />
                </div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#f5a623]">Account settings</p>
                <h1 className="max-w-xs text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">Make your profile yours.</h1>
                <p className="mt-5 max-w-sm text-sm leading-6 text-[#b9bec7]">Keep your details current so every car-market interaction feels personal and secure.</p>
              </div>

              <div className="border-t border-white/10 pt-5 text-sm text-[#b9bec7]">
                <div className="flex items-center gap-2 text-white"><ShieldCheck size={17} className="text-[#f5a623]" /> Your information is private</div>
                <p className="mt-2 text-xs leading-5">Only your public profile details are shown to other members.</p>
              </div>
            </div>
          </aside>

          <section className="px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="flex flex-col gap-5 border-b border-[#ece9e3] pb-7 sm:flex-row sm:items-center">
                <div className="relative h-24 w-24 shrink-0 group">
                  <input onChange={handlefille} type="file" ref={fileInput} hidden />
                  <img alt="profile" src={Image ? Image : currentUser?.avatar} className="h-full w-full rounded-2xl object-cover ring-1 ring-[#dedbd4] transition-transform group-hover:scale-[1.03]" onClick={() => fileInput.current.click()} />
                  <button type="button" aria-label="Change profile photo" onClick={() => fileInput.current.click()} className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5a623] text-[#202329] shadow-lg transition-transform hover:scale-105"><Camera size={16} /></button>
                  {Uploading && <span className="absolute -bottom-8 left-0 whitespace-nowrap text-xs font-semibold text-[#ba7610]">Uploading...</span>}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ba7610]">Personal profile</p>
                  <h2 className="mt-1 text-2xl font-black tracking-tight">Edit your details</h2>
                  <p className="mt-1 text-sm text-[#7a8089]">Your name and email help buyers recognize you.</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#626873]">Full name</label>
                  <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9da2aa]" size={18} /><input id="name" type="text" name="username" onChange={handleChange} defaultValue={currentUser.username} placeholder="Enter your name" className="w-full border border-[#dedbd4] bg-[#faf9f6] py-3.5 pl-11 pr-4 text-[#202329] outline-none transition-colors placeholder:text-[#a6abb2] focus:border-[#f5a623] focus:bg-white" /></div>
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#626873]">Email address</label>
                  <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9da2aa]" size={18} /><input id="email" type="email" name="email" onChange={handleChange} placeholder="you@example.com" defaultValue={currentUser.email} className="w-full border border-[#dedbd4] bg-[#faf9f6] py-3.5 pl-11 pr-4 text-[#202329] outline-none transition-colors placeholder:text-[#a6abb2] focus:border-[#f5a623] focus:bg-white" /></div>
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#626873]">New password</label>
                  <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9da2aa]" size={18} /><input id="password" type={showPassword ? "text" : "password"} name="password" onChange={handleChange} placeholder="Enter new password" className="w-full border border-[#dedbd4] bg-[#faf9f6] py-3.5 pl-11 pr-12 text-[#202329] outline-none transition-colors placeholder:text-[#a6abb2] focus:border-[#f5a623] focus:bg-white" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#858b94] transition-colors hover:text-[#202329]">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
                </div>
              </div>

              <button type="submit" className="flex w-full items-center justify-center gap-2 bg-[#202329] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#f5a623] hover:text-[#202329]"><Check size={17} /> Save changes</button>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#ece9e3] pt-6">
                <button type="button" onClick={handleDelete} className="flex items-center gap-2 text-sm font-semibold text-[#b94b43] transition-colors hover:text-[#8f2923]"><Trash2 size={16} /> log out</button>
              </div>
            </form>
          </section>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}

export default Profile;