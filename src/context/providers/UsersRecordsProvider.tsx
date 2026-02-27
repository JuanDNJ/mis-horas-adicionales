import { type FC } from "react";
import { UserRecordsContext } from "../UserRecordsCtx";
import type { Children } from "../types";

const UserRecordsProvider: FC<Children> = ({ children }) => {
  return <UserRecordsContext.Provider value={undefined}>{children}</UserRecordsContext.Provider>;
};

export default UserRecordsProvider;
