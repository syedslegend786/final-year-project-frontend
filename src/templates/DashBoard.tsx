import TopHeader from "@/layout/Home/TopHeader";
import DashBoardSideBar from "@/layout/dashboard/DashBoardSidebar/DashBoardSideBar";
import { cn } from "@/utils/styles";
import React from "react";
type DashBoardProps = {
  children: React.ReactNode;
  className?: string;
};
const DashBoard: React.FC<DashBoardProps> = ({ children, className }) => {
  return (
    <div className={cn("flex h-screen overflow-hidden", className)}>
      <DashBoardSideBar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default DashBoard;
