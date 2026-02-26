import MainHeader from "./MainHeader";
import MainContent from "./Main";
import type { FC, ReactNode } from "react";

const IndexLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <MainHeader />
      <MainContent>{children}</MainContent>
    </>
  );
};

export default IndexLayout;
