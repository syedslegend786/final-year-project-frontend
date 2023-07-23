import React, { HTMLAttributes } from "react";
import SelectLib, { SingleValue } from "react-select";

import ErrorBox from "../ErrorBox";
import { Label } from "../Label";

export interface OptionType {
  label: string;
  value: string | number;
}
interface CustomSelectProps {
  label?: string;
  error?: string;
  options: OptionType[];
  onChange: (value: SingleValue<OptionType>) => void;
}

const Select: React.FC<CustomSelectProps> = ({
  label,
  error,
  options,
  onChange,
  ...rest
}) => {
  return (
    <div className="space-y-1 ">
      <Label>{label}</Label>
      <SelectLib
        className="react-select-container"
        classNamePrefix="react-select"
        options={options}
        onChange={onChange}
        components={{
          IndicatorSeparator: () => null,
        }}
        {...rest}
      />

      {error && <ErrorBox text={error} />}
    </div>
  );
};

export default Select;
