import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const App = lazy(() => import("@/App"));
const Profile = lazy(() => import("@/pages/Profile"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const RecordDetail = lazy(() => import("@/pages/RecordDetail"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/record/:id",
    element: <RecordDetail />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;
