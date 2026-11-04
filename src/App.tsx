import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import LocationDetails from "./pages/LocationDetails";
import Cadastro from "./pages/Cadastro";

const router = createBrowserRouter([
  {
    path: "/criar-conta",
    element: <Cadastro />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/localizacao/:id",
        element: <LocationDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
