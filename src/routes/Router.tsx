import { type FC } from "react";
import { RouterProvider } from "react-router/dom";
import router from ".";
import { GlobalProvider } from "@/context/GlobalContext";
import { UserProvider } from "@/context/UserContext";
import { ProfileProvider } from "@/context/ProfileContext";

const Router: FC = () => {
  return (
    <GlobalProvider>
      <UserProvider>
        <ProfileProvider>
          <RouterProvider router={router} />
        </ProfileProvider>
      </UserProvider>
    </GlobalProvider>
  );
};

export default Router;
