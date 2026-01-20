import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
