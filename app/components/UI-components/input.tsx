import React from "react";

interface InputProps {
  value: string | number;
  onInputChange: any;
  onInputBlur: any;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
  value,
  onInputChange,
  onInputBlur,
  ...rest
}) => {
  return (
    <>
      <input
        value={value}
        onChange={onInputChange}
        onBlur={onInputBlur}
        {...rest}
      />    
    </>
  );
};

export default Input;
