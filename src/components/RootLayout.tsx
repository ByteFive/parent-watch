import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function RootLayout() {
  return (
    <>
      <div className="h-[calc(100vh-80px)] bg-green-200">
        <Outlet />
      </div>
      <Navbar />
    </>
  );
}
