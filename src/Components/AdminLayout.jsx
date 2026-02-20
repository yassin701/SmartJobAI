import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../Components/AdminSideBar";
import { FaBars } from "react-icons/fa";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-linear-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">SJ</span>
          </div>
          <span className="text-lg font-bold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            SmartJobAI
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <FaBars size={22} />
        </button>
      </div>

      <AdminSideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Content */}
      <main className="w-full min-h-screen pt-16 lg:pt-0 lg:ml-64">
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
