import { cn } from "@/utils/styles";
import React from "react";
type ErrorBox = {
  text: string;
  className?: string;
};
const ErrorBox = ({ text, className }: ErrorBox) => {
  return <div className={cn("text-red-500 text-sm", className)}>{text}</div>;
};

export default ErrorBox;
