import { House, Settings, User } from "lucide-react";
import { useLocation } from "react-router-dom";

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

  const pathname = useLocation().pathname;

  return (
    <nav className="h-20">
      <ul className="flex items-center justify-around h-full">
        {links.map((link) => (
          <li key={link.path}>
            <a
              href={link.path}
              className={`flex flex-col items-center justify-center h-full  ${pathname === link.path ? "text-secondary" : "hover:text-neutral duration-300"}`}
            >
              {link.icon}
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
