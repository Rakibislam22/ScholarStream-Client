import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

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
      }
    ],
  },
]);

export default router;