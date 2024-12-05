import React from "react";

interface InputProps {
  value: string | number;
  onInputChange: any;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
  value,
  onInputChange,
  ...rest
}) => {
  return (
    <>
      <input
        value={value}
        onChange={onInputChange}  
        {...rest}
      />    
    </>
  );
};

export default Input;
