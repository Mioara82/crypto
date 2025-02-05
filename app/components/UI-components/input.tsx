import React from "react";
import { GoSearch } from "react-icons/go";
import { IconContext } from "react-icons/lib";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

interface InputProps {
  value: string | number;
  onInputChange: any;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
  value,
  onInputChange,
  feature,
  ...rest
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="z-1 relative">
      <input value={value} onChange={onInputChange} {...rest} />
      {isMobile && feature !== "converter" && (
        <IconContext.Provider
          value={{
            className:
              "absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 transform z-50 md:top-1/2 md:left-5",
          }}
        >
          <GoSearch />
        </IconContext.Provider>
      )}
    </div>
  );
};

export default Input;
