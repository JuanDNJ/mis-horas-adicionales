import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const App = lazy(() => import("@/App"));
const Profile = lazy(() => import("@/pages/Profile"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;
