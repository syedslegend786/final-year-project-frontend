import Home from "@/app/page";
import TopHeader from "@/layout/Home/TopHeader";
import { cn } from "@/utils/styles";
import React from "react";
type MainProps = {
  children: React.ReactNode;
  className?: string;
};
const Main: React.FC<MainProps> = ({ children, className }) => {
  return (
    <div className={cn("min-h-screen", className)}>
      <TopHeader />
      {children}
    </div>
  );
};

export default Main;
