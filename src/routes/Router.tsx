import { StrictMode, type FC } from "react";
import { RouterProvider } from "react-router/dom";
import router from ".";

const Router: FC = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

export default Router;
