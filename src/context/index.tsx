import { createContext } from "react";
import type { GlobalContextType, UserContextType, ProfileContextType } from "./types";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const UserContext = createContext<UserContextType | undefined>(undefined);
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export { GlobalContext, UserContext, ProfileContext };
