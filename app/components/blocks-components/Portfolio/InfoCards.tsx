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
          <div
            className={`absolute left-0 ${value === "growRate" || value === "intervalInvestment" || value === "totalAmount" ? "-top-20" : "-top-6"} m-0 flex w-56 flex-wrap rounded-md bg-common-green/50 p-2 text-left text-xs text-light-primary`}
          >
            {text}
          </div>
        )}
      </div>
    </>
  );
};

export default InfoCards;
