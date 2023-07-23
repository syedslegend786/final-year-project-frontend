import { cn } from "@/utils/styles";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <h1 className={cn("text-2xl text-primary-500 font-bold", className)}>
      Lemos
    </h1>
  );
};

export default Logo;
