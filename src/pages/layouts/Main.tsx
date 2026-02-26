import type { FC, ReactNode } from "react";

const MainContent: FC<{ children: ReactNode }> = ({ children }) => {
  return <main className="flex flex-col">{children}</main>;
};

export default MainContent;
