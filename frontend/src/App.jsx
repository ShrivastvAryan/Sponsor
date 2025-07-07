// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Pages/Home";
import { AppLayout } from "./Components/layout/AppLayout";
import { About } from "./Pages/About";
import { Connect } from "./Pages/Connect";
import { Team } from "./Pages/Team";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "team",
          element: <Team />,
        },
        {
          path: "/connect",
          element: <Connect />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
