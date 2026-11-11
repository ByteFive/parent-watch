import { House, Settings, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const links = [
    {
      path: "/",
      label: "Início",
      icon: <House />,
    },
    {
      path: "/perfil",
      label: "Perfil",
      icon: <User />,
    },
    {
      path: "/ajustes",
      label: "Ajustes",
      icon: <Settings />,
    },
  ];

  const { user } = useAuth();


  return (

    <nav className={`h-20 bottom-0 bg-white border-t border-neutral/20 ${user?.role === "dependente" ? "hidden" : "sticky"}`}>
      <ul className="flex items-center justify-around h-full">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center h-full ${isActive ? "text-secondary" : "hover:text-neutral duration-300"}`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
