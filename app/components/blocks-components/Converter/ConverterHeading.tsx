import React from "react";
import { formatLabelDate } from "@/app/utils/formatHelpers";

const ConverterHeading = () => {
  const currentDate = formatLabelDate();
  return (
    <>
      <div className="w-full">
        <h3 className="text-xl font-medium text-light-secondaryTextColor dark:text-dark-text">
          Online currency convertor
        </h3>
        <h5 className="text-base font-normal dark:text-[#9e9e9e] text-light-secondaryTextColor">
          {currentDate}
        </h5>
      </div>
    </>
  );
};

export default ConverterHeading;
