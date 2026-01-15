import { createContext } from "react";
import type { GlobalContextType } from "./types";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export { GlobalContext };
