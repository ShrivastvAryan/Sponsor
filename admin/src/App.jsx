
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllSponsors from './pages/allsponsors'
import BusinessForm from './pages/hero'

function App() {
  const router = createBrowserRouter([
        {
          path: "/",
          element: <BusinessForm/>,
        },
        {
          path: "/allsponsors",
          element: <AllSponsors />,
        }
      ],);

  return <RouterProvider router={router} />;
}

export default App;
