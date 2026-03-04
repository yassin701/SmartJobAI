import { Link, useLocation } from "react-router-dom";
import { FaUser, FaHome, FaBriefcase, FaPaperPlane, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  // Check active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 bg-linear-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">SJ</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-300">
                SmartJob
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Find Your Dream Job</p>
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-gray-50 dark:bg-slate-800 rounded-2xl p-1.5 transition-colors duration-300">
            <NavLink to="/" isActive={isActive("/")} icon={<FaHome />} text="Home" />
            <NavLink to="/jobs" isActive={isActive("/jobs")} icon={<FaBriefcase />} text="Jobs" />
            <NavLink to="/apply" isActive={isActive("/apply")} icon={<FaPaperPlane />} text="Apply" />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Open Menu"
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <FaBars size={24} />
          </button>

          {/* User Profile / Auth (Desktop) */}
          <div className="hidden md:flex items-center gap-4">

            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg transition-colors">
                  <FaUser className="text-sm" />
                  <span className="font-medium">{user.name}</span>
                </div>
                {role === "admin" && (
                  <Link to="/admin/dashboard" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => dispatch(logout())}
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="group flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/30 font-medium"
              >
                Sign In
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Sidebar/Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed right-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 shadow-2xl flex flex-col p-6 animate-slide-left transition-colors duration-300">
            <div className="flex items-center justify-between mb-10">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                <div className="h-8 w-8 bg-linear-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SJ</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">SmartJob</span>
              </Link>
              <button
                aria-label="Close Menu"
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <MobileNavLink to="/" isActive={isActive("/")} icon={<FaHome />} text="Home" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/jobs" isActive={isActive("/jobs")} icon={<FaBriefcase />} text="Jobs" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/apply" isActive={isActive("/apply")} icon={<FaPaperPlane />} text="Apply" onClick={() => setIsOpen(false)} />

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl transition-colors">
                      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-medium">
                        <FaUser />
                        <span>{user.name}</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-blue-100 rounded-md uppercase tracking-wider">{role}</span>
                    </div>
                    {role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium rounded-xl hover:bg-purple-100 dark:hover:bg-purple-800/50 transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        dispatch(logout());
                        setIsOpen(false);
                      }}
                      className="w-full p-3 text-red-600 dark:text-red-400 font-medium rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-center"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center gap-2 w-full p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Sign In / Register
                  </Link>
                )}
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
          ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-100 dark:border-slate-600"
          : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-slate-700/50"
        }
      `}
    >
      <span className={`${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}`}>
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
          ? "bg-blue-600 text-white shadow-lg shadow-blue-100 dark:shadow-none"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
        }
      `}
    >
      <span className={isActive ? "text-white" : "text-gray-400 dark:text-gray-500"}>
        {icon}
      </span>
      <span>{text}</span>
    </Link>
  );
}
