import React from "react";
import ErrorBox from "../ErrorBox";
import { Label } from "../Label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...rest }) => {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <input
        {...rest}
        className="h-10 w-full rounded-md border border-gray-200 p-3 text-sm  focus:outline-none focus:ring-0 disabled:pointer-events-none"
        autoComplete="off"
      />
      {error && <ErrorBox text={error} />}
    </div>
  );
};

export default Input;
