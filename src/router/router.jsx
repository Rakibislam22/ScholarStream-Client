import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../pages/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import About from "../pages/About";
import AllScholarships from "../pages/AllScholarShips";
import ScholarshipDetails from "../pages/ScholarshipDetails";
import PrivateRoute from "../provider/PrivateRoute";
import Dashboard from "../pages/Dashboard";
import AddScholarship from "../components/adminDashboardComponenet/AddScholarship";
import ManageScholarships from "../components/adminDashboardComponenet/ManageScholarships";
import UpdateScholarship from "../components/adminDashboardComponenet/UpdateScholarship";
import ManageUsers from "../components/adminDashboardComponenet/ManageUsers";
import Analytics from "../components/adminDashboardComponenet/Analytics";
import MyProfile from "../pages/MyProfile";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel";
import MyApplications from "../components/studentDashboardComponents.jsx/MyApplications";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import StudentRoute from "./StudentRoute";
import MyReviews from "../components/studentDashboardComponents.jsx/MyReviews";
import ModeratorRoute from "./ModeratorRoute";
import ManageAppliedApplications from "../components/modaretorDashboardComponent.jsx/ManageAppliedApplications";
import AllReviews from "../components/modaretorDashboardComponent.jsx/AllReviews";
import Forbidden from "../pages/Forbidden";
import ErrorPage from "../pages/ErrorPage";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";

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
        path: "/scholarship/:id",
        element: <ScholarshipDetails></ScholarshipDetails>
      },
      {
        path: "/payment-success/:applicationId",
        element: <PrivateRoute><PaymentSuccess></PaymentSuccess></PrivateRoute>
      },
      {
        path: "/payment-cancel/:applicationId",
        element: <PrivateRoute><PaymentCancel></PaymentCancel></PrivateRoute>
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
        element: <About />
      },
      {
        path: "/privacy",
        element: <Privacy></Privacy>
      },
      {
        path:"/terms",
        element:<Terms></Terms>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        index: true,
        Component: DashboardLayout
      },
      {
        path: "/dashboard/add-scholarship",
        element: <AdminRoute><AddScholarship></AddScholarship></AdminRoute>
      },
      {
        path: "/dashboard/manage-scholarship",
        element: <AdminRoute><ManageScholarships></ManageScholarships></AdminRoute>
      },
      {
        path: "/dashboard/update-scholarship/:id",
        element: <AdminRoute><UpdateScholarship></UpdateScholarship></AdminRoute>
      },
      {
        path: "/dashboard/manage-users",
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: "/dashboard/profile",
        element: <MyProfile></MyProfile>
      },
      {
        path: "/dashboard/my-applications",
        element: <StudentRoute><MyApplications></MyApplications></StudentRoute>
      },
      {
        path: "/dashboard/my-reviews",
        element: <StudentRoute><MyReviews></MyReviews></StudentRoute>
      },
      {
        path: "/dashboard/manage-applications",
        element: <ModeratorRoute><ManageAppliedApplications></ManageAppliedApplications></ModeratorRoute>
      },
      {
        path: "/dashboard/all-reviews",
        element: <ModeratorRoute><AllReviews></AllReviews></ModeratorRoute>
      }
    ]
  },
  {
    path: "/forbidden",
    element: <Forbidden />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
]);

export default router;