import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from './Components/AdminLayout';
import UserLayout from "./Components/UseLayout";
import AdminAdd from "./Pages/Admin/AdminAdd";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Home from './Pages/Home'
import Apply from "./Pages/Apply"
import Jobs from "./Pages/Jobs";
import JobDetail from "./Pages/JobDetail";
import AdminApplication from "./Pages/Admin/AdminApplication";


import { useState } from "react";
import './App.css';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    !!localStorage.getItem("isAdmin")
  );

  return (
    <BrowserRouter>
      <Routes>

        {/* ================= Admin Routes ================= */}
        <Route 
          path="/admin/login" 
          element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} 
        />
        <Route 
          path="/admin" 
          element={isAdminLoggedIn ? <AdminLayout /> : <Navigate to="/admin/login" />}
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add" element={<AdminAdd />} />
          <Route path="applications" element={<AdminApplication />} />
        </Route>



        {/* ================= User Routes ================= */}
        <Route element={<UserLayout/>}>
        <Route path="/" element={<Home />} />                 {/* home page */}
        <Route path="/jobs" element={<Jobs />} />             {/* list of jobs */}
        <Route path="/jobs/:id" element={<JobDetail />} />   {/* job details */}
        <Route path="/Apply" element={<Apply/>}/>
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
