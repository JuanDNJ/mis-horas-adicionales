import { createContext, useContext } from "react";
import type { UserRecord } from "./types";

export const UserRecordsContext = createContext<UserRecord | undefined>(undefined);

export const useUserRecords = () => {
  return useContext(UserRecordsContext);
};
