import "@/assets/index.css";
import { createRoot } from "react-dom/client";
import Router from "./routes/Router.tsx";
import { rootElement } from "./lib/utils.ts";

const app = rootElement() as HTMLElement;
const root = createRoot(app);

root.render(<Router />);
