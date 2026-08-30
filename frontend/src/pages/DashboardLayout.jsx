import { useState } from "react";
import { Outlet } from "react-router-dom";
import {useAppContext} from '../context/AppContext.jsx'
import {
  Menu,
  X,
  LayoutDashboard,
  Car,
  PlusCircle,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import {Link, useNavigate} from 'react-router-dom'

function DashboardLayout() {
    const {currentUser} = useAppContext()
    const navigate = useNavigate()
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('current-user-data');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen border-r border-slate-200 bg-white transition-all duration-300 ${
          open ? "w-64" : "w-20"
        }`}
      >
        {/* Logo + Toggle */}
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-4">

          {open && (
            <h1 className="text-xl font-bold text-indigo-600">
              CarHub
            </h1>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>

        </div>

        {/* Links */}
        <nav className="space-y-2 px-3 py-6">

          <button className="flex w-full items-center gap-3 rounded-xl bg-indigo-50 px-3 py-3 text-indigo-600">
            <LayoutDashboard size={21} />

            {open && (
              <span className="font-medium">
                Dashboard
              </span>
            )}
          </button>

          <Link to="/dashboard/Listing" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600">
            <Car size={21} />

            {open && (
              <span className="font-medium">
                My Listings
              </span>
            )}
          </Link>

          <Link to="/dashboard/carListing" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600">
            <PlusCircle size={21} />

            {open && (
              <span className="font-medium">
                Add Car
              </span>
            )}
          </Link>

          <Link to="/dashboard/profile" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600">
            <User size={21} />

            {open && (
              <span className="font-medium">
                Profile
              </span>
            )}
          </Link>

          <Link to="/dashboard/settings" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600">
            <Settings size={21} />

            {open && (
              <span className="font-medium">
                Settings
              </span>
            )}
          </Link>

        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 w-full border-t border-slate-200 p-3">

          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-red-500 transition hover:bg-red-50">
            <LogOut size={21} />

            {open && (
              <span className="font-medium">
                Logout
              </span>
            )}
          </button>

        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`min-h-screen transition-all duration-300 ${
          open ? "ml-64" : "ml-20"
        }`}
      >
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;