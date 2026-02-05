import { Link, useLocation } from "react-router-dom";
import { FaUser, FaHome, FaBriefcase, FaPaperPlane } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  
  // Check active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 bg-linear-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">SJ</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                SmartJob
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Find Your Dream Job</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100/80 rounded-2xl p-1.5">
            <NavLink to="/" isActive={isActive("/")} icon={<FaHome />} text="Home" />
            <NavLink to="/jobs" isActive={isActive("/jobs")} icon={<FaBriefcase />} text="Jobs" />
            <NavLink to="/apply" isActive={isActive("/apply")} icon={<FaPaperPlane />} text="Apply" />
          </div>

          {/* Mobile Menu (simple version) */}
          <div className="md:hidden flex gap-6">
            <Link to="/" className={`${isActive("/") ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}>
              <FaHome size={20} />
            </Link>
            <Link to="/jobs" className={`${isActive("/jobs") ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}>
              <FaBriefcase size={20} />
            </Link>
            <Link to="/apply" className={`${isActive("/apply") ? "text-blue-600" : "text-gray-700"} hover:text-blue-600`}>
              <FaPaperPlane size={20} />
            </Link>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <Link 
              to="/admin/login" 
              className="group flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all hover:shadow-md"
            >
              <div className="h-8 w-8 bg-linear-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaUser className="text-white text-sm" />
              </div>
              <span className="text-gray-700 font-medium hidden md:block">Login</span>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

// Reusable NavLink Component
function NavLink({ to, isActive, icon, text }) {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all
        ${isActive 
          ? "bg-white text-blue-600 shadow-md" 
          : "text-gray-600 hover:text-blue-600 hover:bg-white/50"
        }
      `}
    >
      <span className={`${isActive ? "text-blue-600" : "text-gray-500"}`}>
        {icon}
      </span>
      <span>{text}</span>
    </Link>
  );
}