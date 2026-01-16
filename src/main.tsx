import "@/assets/index.css";
import { createRoot } from "react-dom/client";
import Router from "./routes/Router.tsx";
import { GlobalProvider } from "@/context/GlobalContext";
import { UserProvider } from "./context/UserContext.tsx";
import { ProfileProvider } from "./context/ProfileContext.tsx";

const app = createRoot(document.getElementById("root")!);

app.render(
  <GlobalProvider>
    <UserProvider>
      <ProfileProvider>
        <Router />
      </ProfileProvider>
    </UserProvider>
  </GlobalProvider>
);
