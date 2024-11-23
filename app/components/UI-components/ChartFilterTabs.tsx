import React from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { chartFilter } from "@/app/utils/ChartUtils/chartFilter";
import { handleSelectedFilter } from "@/lib/features/converterSlice";
import { RootState } from "@/lib/store";

const ChartFilterTabs = () => {
const selectedFilter = useAppSelector((state:RootState)=>state.converter.selectedFilter);
const dispatch = useAppDispatch();
const handleFilter = (id:number) => {
  dispatch(handleSelectedFilter({id}));
};

  return (
    <div className="w-[463px] h-[42px] bg-light-lightBg dark:bg-dark-hover rounded-md ">
      <ul className="flex justify-around items-center p-1 gap-2">
        {chartFilter.map((title) => (
          <li
            className={`text-sm text-light-secondaryTextColor dark:text-[#a7a7cc] text-center cursor-pointer px-5 py-2 rounded-md ${
              selectedFilter.period && title.id === selectedFilter.id ? "dark:bg-[#6161d650]" : ""
            }`}
            key={title.id}
            onClick={() => handleFilter(title.id)}
          >
            {title.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChartFilterTabs;
