import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

const App = lazy(() => import("@/App"));
const Profile = lazy(() => import("@/pages/Profile"));
const CreateProfile = lazy(() => import("@/pages/CreateProfile"));
const Records = lazy(() => import("@/pages/Records"));
const RecordDetail = lazy(() => import("@/pages/RecordDetail"));
const NewTimeRecord = lazy(() => import("@/pages/NewTimeRecord"));
const TimeDetail = lazy(() => import("@/pages/TimeDetail"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/records",
        element: <Records />,
      },
      {
        path: "/new-time-record",
        element: <NewTimeRecord />,
      },
      {
        path: "/time-detail/:id",
        element: <TimeDetail />,
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
