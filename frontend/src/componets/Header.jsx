import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Menu, X  } from "lucide-react";
import {useAppContext} from '../context/AppContext.jsx'
function Header() {
  const {currentUser} = useAppContext()
  const [open, setOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/sign-in", label: "Sign In" },
    { to: "/sign-up", label: "Sign Up" },
  ];
    const avatarUrl = currentUser?.avatar
  return (
    <header className="sticky top-0 z-50 bg-[#0B0D10]/90 backdrop-blur-md">
      {/* Xariiqda sare - u eg calaamadaha jidka (road dashes) oo dhaqaaqaysa */}
      <div className="h-[3px] w-full overflow-hidden bg-[#1A1D22]">
        <div className="h-full w-[200%] bg-[repeating-linear-gradient(90deg,#F5A623_0_24px,transparent_24px_48px)] animate-[road_2.4s_linear_infinite]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-extrabold tracking-tight text-white">
              Car<span className="text-[#F5A623]">market</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5A623] group-hover:animate-ping" />
          </Link>
      
          
          {/* Nav-ka desktop-ka */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="relative text-sm text-[#B9BEC7] hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#F5A623] after:transition-all after:duration-300 hover:after:w-full"
            >
            Home
             
            </Link>
            <Link
              to="/about"
              className="relative text-sm text-[#B9BEC7] hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#F5A623] after:transition-all after:duration-300 hover:after:w-full"
            >
            About 
             
            </Link>
            <Link
              to="/contact"
              className="relative text-sm text-[#B9BEC7] hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#F5A623] after:transition-all after:duration-300 hover:after:w-full"
            >
            Contact me
             
            </Link>
            <Link
              to="/allListing"
              className="relative text-sm text-[#B9BEC7] hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#F5A623] after:transition-all after:duration-300 hover:after:w-full"
            >
            All Listing
             
            </Link>
            <Link
  to={currentUser ? "/profile" : "/login"}
  className="relative text-sm text-[#B9BEC7] hover:text-white transition-colors"
>
  {currentUser ? (
    <img
      src={avatarUrl}
      alt="Profile"
      className="w-10 h-10 rounded-full object-cover border-2 border-[#F5A623]"
    />
  ) : (
    "Sign In"
  )}
</Link>
          

            <Link
              to="/signUp"
              className="text-sm font-medium text-[#0B0D10] bg-[#F5A623] px-4 py-2 rounded-md hover:bg-white transition-colors duration-300 hover:shadow-[0_0_20px_rgba(245,166,35,0.4)]"
            >
              Sign Up
            </Link>

            <Link
              to="/profile"
              className="text-[#B9BEC7] hover:text-[#F5A623] transition-colors duration-300 hover:rotate-6"
            >
              <User size={20} />
            </Link>
          </nav>

          {/* Badhanka menu-ga mobile-ka */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu-ga mobile-ka - slide down animation */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 flex flex-col gap-4 border-t border-[#1A1D22] pt-4">
          <Link to="/profile" onClick={() => setOpen(false)} className="text-sm text-[#B9BEC7] hover:text-white">
            {
              currentUser ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#F5A623]"
                />
              ) : (
                <span>Sign In</span>
              )
            }
          </Link>
          <Link to="/sigNup" onClick={() => setOpen(false)} className="text-sm text-[#F5A623] font-medium">
            Sign Up
          </Link>
          <Link to="/profile" onClick={() => setOpen(false)} className="text-sm text-[#B9BEC7] hover:text-white flex items-center gap-2">
            <User size={16} /> Profile
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes road {
          from { transform: translateX(0); }
          to { transform: translateX(-24px); }
        }
      `}</style>
    </header>
  );
}

export default Header;