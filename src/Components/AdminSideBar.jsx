import { NavLink, useNavigate, Link } from "react-router-dom";
import { LayoutDashboard, PlusCircle, LogOut, Users } from "lucide-react";
import { FaTimes } from "react-icons/fa";

export default function AdminSideBar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 shadow-lg z-50
          flex flex-col transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 bg-linear-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-md">
                <span className="font-bold text-white text-lg">SJ</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  SmartJobAI
                </h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </Link>
            {/* Close button (mobile only) */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <NavLink
            to="/admin/dashboard"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
              ${isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <LayoutDashboard size={20} />
            <span>Jobs</span>
          </NavLink>

          <NavLink
            to="/admin/add"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
              ${isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <PlusCircle size={20} />
            <span>Add Job</span>
          </NavLink>

          <NavLink
            to="/admin/applications"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
              ${isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`
            }
          >
            <Users size={20} />
            <span>Applications</span>
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}