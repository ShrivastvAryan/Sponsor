import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { Explore } from "./Pages/Explore";
import { AppLayout } from "./Components/Layout/AppLayout";
import { Explore2 } from "./Pages/Explore2";

function App() {
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
          path: "explore",
          element: <Explore />,
        },
        {
          path: "explore2",
          element: <Explore2 />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
