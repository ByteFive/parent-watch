import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function RootLayout() {
  return (
    <>
      <div className="min-h-[calc(100vh-80px)] p-4">
        <Outlet />
      </div>
      <Navbar />
    </>
  );
}
