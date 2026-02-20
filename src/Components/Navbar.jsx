import { Link, useLocation } from "react-router-dom";
import { FaUser, FaHome, FaBriefcase, FaPaperPlane, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Check active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
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

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-gray-50 rounded-2xl p-1.5">
            <NavLink to="/" isActive={isActive("/")} icon={<FaHome />} text="Home" />
            <NavLink to="/jobs" isActive={isActive("/jobs")} icon={<FaBriefcase />} text="Jobs" />
            <NavLink to="/apply" isActive={isActive("/apply")} icon={<FaPaperPlane />} text="Apply" />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <FaBars size={24} />
          </button>

          {/* User Profile (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/admin/login"
              className="group flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all hover:shadow-md"
            >
              <div className="h-8 w-8 bg-linear-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaUser className="text-white text-sm" />
              </div>
              <span className="text-gray-700 font-medium">Admin</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Sidebar/Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed right-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col p-6 animate-slide-left">
            <div className="flex items-center justify-between mb-10">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                <div className="h-8 w-8 bg-linear-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SJ</span>
                </div>
                <span className="text-xl font-bold text-gray-900">SmartJob</span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <MobileNavLink to="/" isActive={isActive("/")} icon={<FaHome />} text="Home" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/jobs" isActive={isActive("/jobs")} icon={<FaBriefcase />} text="Jobs" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/apply" isActive={isActive("/apply")} icon={<FaPaperPlane />} text="Apply" onClick={() => setIsOpen(false)} />

              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <FaUser className="text-blue-500" />
                  Admin Portal
                </Link>
              </div>
            </div>

            <div className="mt-auto text-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} SmartJob</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// NavLink Component (Desktop)
function NavLink({ to, isActive, icon, text }) {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all
        ${isActive
          ? "bg-white text-blue-600 shadow-sm border border-gray-100"
          : "text-gray-600 hover:text-blue-600 hover:bg-white/50"
        }
      `}
    >
      <span className={`${isActive ? "text-blue-600" : "text-gray-400"}`}>
        {icon}
      </span>
      <span>{text}</span>
    </Link>
  );
}

// Mobile NavLink Component
function MobileNavLink({ to, isActive, icon, text, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        flex items-center gap-4 p-4 rounded-xl font-medium transition-all
        ${isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
          : "text-gray-600 hover:bg-gray-50"
        }
      `}
    >
      <span className={isActive ? "text-white" : "text-gray-400"}>
        {icon}
      </span>
      <span>{text}</span>
    </Link>
  );
}
