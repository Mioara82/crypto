import React from "react";
import SearchIcon from "@/app/icons/searchIcon";

interface InputProps {
  value: string;
  show: boolean;
  onInputChange: any;
  onInputBlur: () => void;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
  value,
  show,
  onInputChange,
  onInputBlur,
  ...rest
}) => {
  return (
    <>
      <input
        className={`border-1 z-50 rounded-md pl-9 pr-4 py-2 bg-light-lightBg dark:bg-dark-191 focus:outline-none text-sm w-[356px] text-light-secondaryTextColor/80  dark:text-dark-chartTextColor 
        ${show ? "rounded-b-none" : "rounded-xl"}`}
        value={value}
        onChange={onInputChange}
        onBlur={onInputBlur}
        {...rest}
      />
      <SearchIcon />
    </>
  );
};

export default Input;
