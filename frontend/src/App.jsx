// import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Pages/Home";
import { AppLayout } from "./Components/layout/AppLayout";
import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { Connect } from "./Pages/Connect";

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
          path: "contact",
          element: <Contact />,
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
