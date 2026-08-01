import React from 'react'

function SigNup() {
  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-4">
  <div className="bg-white/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
    <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
      Sign Up
    </h1>
    <p className="text-center text-slate-500 text-sm mb-6">
      Create your account to get started
    </p>

    <form className="space-y-4">
      <input
        type="text"
        id="username"
        placeholder="Username"
        className="w-full border border-slate-200 p-3.5 rounded-xl outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-slate-400"
      />

      <input
        type="email"
        id="email"
        placeholder="Email"
        className="w-full border border-slate-200 p-3.5 rounded-xl outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-slate-400"
      />

      <input
        type="password"
        id="password"
        placeholder="Password"
        className="w-full border border-slate-200 p-3.5 rounded-xl outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-slate-400"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 active:scale-[0.98]"
      >
        Sign Up
      </button>
    </form>

    <p className="text-center text-sm text-slate-500 mt-6">
      Already have an account?{" "}
      <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
        Log in
      </span>
    </p>
  </div>
</div>
  )
}

export default SigNup
