import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      
      {/* Logo */}
      <h1 className="text-xl font-bold text-blue-600 ml-4">
        SmartJob
      </h1>

      {/* Links */}
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li>
          <Link to="/" className="hover:text-blue-600">Home</Link>
        </li>
        <li>
          <Link to="/jobs" className="hover:text-blue-600">Jobs</Link>
        </li>
        <li>
          <Link to="/apply" className="hover:text-blue-600">Apply</Link>
        </li>
      </ul>

      {/* User Icon */}
      <Link to="/admin/login" className="text-gray-700 hover:text-blue-600 mr-4">
        <FaUser size={20} />
      </Link>

    </nav>
  );
}
