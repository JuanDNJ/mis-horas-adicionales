import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import RecordNewHours from "@/pages/RecordNewHours";

const App = lazy(() => import("@/App"));
const Profile = lazy(() => import("@/pages/Profile"));
const CreateProfile = lazy(() => import("@/pages/CreateProfile"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const RecordDetail = lazy(() => import("@/pages/RecordDetail"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/record",
        element: <RecordNewHours />,
      },
      {
        path: "/record/:id",
        element: <RecordDetail />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/create-profile",
        element: <CreateProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
