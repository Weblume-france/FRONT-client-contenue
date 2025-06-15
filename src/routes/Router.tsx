import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Homepage from "../components/pages/home/Homepage";
import About from "../components/pages/about/About";
import Dashboard from "../components/pages/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      // Tu peux ajouter d'autres routes enfants ici
    ],
  },
]);

export default router;
