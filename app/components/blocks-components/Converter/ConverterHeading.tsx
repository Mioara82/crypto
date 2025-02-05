import React from "react";
import { formatLabelDate } from "@/app/utils/formatHelpers";

const ConverterHeading = () => {
  const currentDate = formatLabelDate();
  return (
    <>
      <div className="w-full pl-6">
        <h3 className="text-base font-medium text-light-secondaryTextColor dark:text-dark-text md:text-xl">
          Online currency convertor
        </h3>
        <h5 className="text-sm font-normal text-light-secondaryTextColor dark:text-[#9e9e9e] md:text-base">
          {currentDate}
        </h5>
      </div>
    </>
  );
};

export default ConverterHeading;
