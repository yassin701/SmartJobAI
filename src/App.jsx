import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from './Components/AdminLayout';
import UserLayout from "./Components/UseLayout";
import AdminAdd from "./Pages/Admin/AdminAdd";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Auth from "./Pages/Auth";
import Home from './Pages/Home'
import Apply from "./Pages/Apply"
import Jobs from "./Pages/Jobs";
import JobDetail from "./Pages/JobDetail";
import AdminApplication from "./Pages/Admin/AdminApplication";


import { useSelector } from "react-redux";
import './App.css';

function App() {
  const { role } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>

        {/* ================= Admin Routes ================= */}
        <Route
          path="/auth"
          element={!role ? <Auth /> : <Navigate to={role === "admin" ? "/admin/dashboard" : "/"} />}
        />
        <Route
          path="/admin/login"
          element={<Navigate to="/auth" />}
        />
        <Route
          path="/admin"
          element={role === "admin" ? <AdminLayout /> : <Navigate to="/auth" />}
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="add" element={<AdminAdd />} />
          <Route path="applications" element={<AdminApplication />} />
        </Route>



        {/* ================= User Routes ================= */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />                 {/* home page */}
          <Route path="/jobs" element={<Jobs />} />             {/* list of jobs */}
          <Route path="/jobs/:id" element={<JobDetail />} />   {/* job details */}
          <Route path="/Apply" element={role ? <Apply /> : <Navigate to="/auth" />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
