import { createContext } from "react";
import type { GlobalContextType, UserContextType } from "./types";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const UserContext = createContext<UserContextType | undefined>(undefined);
export { GlobalContext, UserContext };
