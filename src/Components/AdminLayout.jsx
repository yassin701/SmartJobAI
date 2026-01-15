import { Outlet } from "react-router-dom";
import AdminSideBar from "../Components/AdminSideBar";

export default function AdminLayout() {
  return (
    <div className="flex">
      <AdminSideBar/> 

      {/* Content */}
      <main className="ml-64 w-full min-h-screen bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}




