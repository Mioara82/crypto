import React from "react";
import { chartFilter } from "@/app/utils/ChartUtils/chartFilter";
import { daysObject } from "@/lib/types/types";

interface ChartFilterTabsProps {
  days: daysObject;
  handleSelectedFilter: any;
}

const ChartFilterTabs: React.FC<ChartFilterTabsProps> = ({
  days,
  handleSelectedFilter,
}) => {
  return (
    <div className="w-[463px] h-[42px] bg-light-lightBg dark:bg-dark-hover rounded-md ">
      <ul className="flex justify-around text-center gap-2">
        {chartFilter.map((title) => (
          <li
            className={`text-sm text-light-secondaryTextColor dark:text-[#a7a7cc] text-center cursor-pointer px-5 py-2 rounded-md ${
              days && title.id === days.id ? "dark:bg-[#6161d650]" : ""
            }`}
            key={title.id}
            onClick={() => handleSelectedFilter(title.id)}
          >
            {title.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChartFilterTabs;
