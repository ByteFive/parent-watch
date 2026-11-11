import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import LocationDetails from "./pages/LocationDetails";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import LinkChild from "./pages/LinkChild";
import Cadastro from "./pages/Cadastro";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/cadastro", element: <Cadastro /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            element: <ProtectedRoute allowedRoles={["responsavel"]} />,
            children: [
              { path: "/", element: <Home /> },
              { path: "/localizacao/:id", element: <LocationDetails /> },
              { path: "/vincular-filho", element: <LinkChild /> },
              { path: "/perfil", element: <Profile /> }
            ],
          },
          { path: "/ajustes", element: <Settings /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
