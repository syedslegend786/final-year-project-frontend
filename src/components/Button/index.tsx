import { cn } from "@/utils/styles";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  leftIcon?: React.ReactNode;
  RightIcon?: React.ReactNode;
  children: React.ReactNode;
}
const Button = ({
  className,
  leftIcon,
  RightIcon,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(
        "flex items-center gap-x-3 py-2 px-5 rounded-lg text-sm bg-primary-500 text-white justify-center whitespace-nowrap",
        className
      )}
    >
      {leftIcon}
      <div>{children}</div>
      {RightIcon}
    </button>
  );
};

export default Button;
