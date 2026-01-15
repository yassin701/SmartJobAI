import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  LogOut,
} from "lucide-react";

export default function AdminSideBar() {
  return (
    <aside className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        SmartJobAI
      </div>

      {/* Menu */}
      <nav className="mt-6 flex flex-col gap-2 px-4">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition
             ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>



        <NavLink
          to="/admin/add"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition
             ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`
          }
        >
          <PlusCircle size={20} />
          Add Job
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-6 w-full px-4">
        <button
          className="w-full flex items-center gap-3 p-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
