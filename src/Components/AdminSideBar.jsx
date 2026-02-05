import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, PlusCircle, LogOut, Settings, Users, Briefcase } from "lucide-react";

export default function AdminSideBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white fixed left-0 top-0 shadow-2xl">
      
      {/* Logo */}
      <div className="p-8 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="font-bold text-xl">SJ</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              SmartJobAI
            </h1>
            <p className="text-sm text-gray-400">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 mt-4">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-4 p-4 rounded-xl transition-all group
            ${isActive 
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg" 
              : "hover:bg-gray-800 text-gray-300 hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={22} />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/add"
          className={({ isActive }) =>
            `flex items-center gap-4 p-4 rounded-xl transition-all group
            ${isActive 
              ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg" 
              : "hover:bg-gray-800 text-gray-300 hover:text-white"
            }`
          }
        >
          <PlusCircle size={22} />
          <span className="font-medium">Add Job</span>
        </NavLink>

        {/* Additional menu items */}
        <NavLink
          to="/admin/jobs"
          className={({ isActive }) =>
            `flex items-center gap-4 p-4 rounded-xl transition-all group
            ${isActive 
              ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg" 
              : "hover:bg-gray-800 text-gray-300 hover:text-white"
            }`
          }
        >
          <Briefcase size={22} />
          <span className="font-medium">All Jobs</span>
        </NavLink>

        <NavLink
          to="/admin/applications"
          className={({ isActive }) =>
            `flex items-center gap-4 p-4 rounded-xl transition-all group
            ${isActive 
              ? "bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg" 
              : "hover:bg-gray-800 text-gray-300 hover:text-white"
            }`
          }
        >
          <Users size={22} />
          <span className="font-medium">Applications</span>
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 w-full p-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full p-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <LogOut size={20} />
          Logout
        </button>
        
        {/* Admin Profile */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
            <span className="font-bold text-lg">A</span>
          </div>
          <div>
            <p className="font-medium">Administrator</p>
            <p className="text-sm text-gray-400">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}