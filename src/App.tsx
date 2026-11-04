import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import LocationDetails from "./pages/LocationDetails";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
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
      {
        path: "/Ajustes",
        element: <Settings />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
