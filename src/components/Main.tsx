import type { FC, ReactNode } from "react";

const Main: FC<{ children: ReactNode }> = ({ children }) => {
  return <main className="flex flex-col overflow-x-hidden">{children}</main>;
};

export default Main;
