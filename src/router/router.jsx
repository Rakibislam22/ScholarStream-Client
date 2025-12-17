import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import About from "../pages/About";
import AllScholarships from "../pages/AllScholarShips";
import ScholarshipDetails from "../pages/ScholarshipDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        path: "/",
        Component: Home
      },
      {
        path: "/scholarships",
        element: <AllScholarships></AllScholarships>
      },
      {
        path:"/scholarship/:id",
        element: <ScholarshipDetails></ScholarshipDetails>
      },
      {
        path: "/auth",
        Component: AuthLayouts,
        children: [
          {
            path: "/auth/signup",
            element: <Signup></Signup>
          },
          {
            path: "/auth/login",
            element: <Login></Login>
          }
          
        ]
      },
      {
        path: "/about",
        element: <About/>
      }
    ],
  },
]);

export default router;