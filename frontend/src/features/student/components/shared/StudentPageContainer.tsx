import type { ReactNode } from "react";

interface StudentPageContainerProps {
  children: ReactNode;
}

const StudentPageContainer = ({ children }: StudentPageContainerProps) => {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>;
};

export default StudentPageContainer;