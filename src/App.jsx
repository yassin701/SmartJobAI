import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from './Components/AdminLayout'
import AdminAdd from "./Pages/Admin/AdminAdd";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import './app.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>

       

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AdminAdd />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
