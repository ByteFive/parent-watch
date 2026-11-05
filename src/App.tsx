import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import LocationDetails from "./pages/LocationDetails";
import Login from "./pages/Login";
import LinkChild from "./pages/LinkChild";
import Cadastro from "./pages/Cadastro";

const router = createBrowserRouter([
  
   {
        path: "/",
        element: <Login />,
  },
  {
    path: "/criar-conta",
    element: <Cadastro />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/localizacao/:id",
        element: <LocationDetails />,
      },
      {
        path: "/vincular-filho",
        element : <LinkChild />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
