import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import LocationDetails from "./pages/LocationDetails";
import LinkChild from "./pages/LinkChild";

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
