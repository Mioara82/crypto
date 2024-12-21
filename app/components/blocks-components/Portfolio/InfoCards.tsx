import React, { useState } from "react";
import { GoQuestion } from "react-icons/go";

const InfoCards = ({ value, text }: { value: string; text: string }) => {
  const [infoCardConfig, setInfoCardConfig] = useState<{
    info: string;
    isOpen: boolean;
  }>({
    info: "",
    isOpen: false,
  });
  const { info, isOpen } = infoCardConfig;
  const handleInfoCardDisplay = (info: string) => {
    setInfoCardConfig((prev) => ({
      info,
      isOpen: prev.info === info ? !prev.isOpen : true,
    }));
  };
  return (
    <>
      <div>
        <div onClick={() => handleInfoCardDisplay(value)}>
          <GoQuestion />
        </div>
        {isOpen && info === value && (
          <div className="absolute left-1/3 top-3 flex flex-wrap w-56 bg-common-green/50 text-xs text-light-primary text-left p-2 rounded-md m-0">
            {text}
          </div>
        )}
      </div>
    </>
  );
};

export default InfoCards;
