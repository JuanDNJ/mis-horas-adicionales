import "@/assets/index.css";
import { createRoot } from "react-dom/client";
import Router from "./routes/Router.tsx";
import { GlobalProvider } from "@/context/GlobalContext";

const app = createRoot(document.getElementById("root")!);

app.render(
  <GlobalProvider>
    <Router />
  </GlobalProvider>
);
