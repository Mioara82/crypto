import React from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { chartFilter } from "@/app/utils/ChartUtils/chartFilter";
import { handleSelectedFilter } from "@/lib/features/converterSlice";
import { RootState } from "@/lib/store";

const ChartFilterTabs = () => {
  const selectedFilter = useAppSelector(
    (state: RootState) => state.converter.selectedFilter,
  );
  const dispatch = useAppDispatch();
  const handleFilter = (id: number) => {
    dispatch(handleSelectedFilter({ id }));
  };

  return (
    <div className="m-0 h-[42px] max-w-[90%] rounded-md bg-light-lightBg pt-1 dark:bg-dark-hover sm:max-w-[70%] md:max-w-[60%] lg:max-w-[463px]">
      <ul className="m-auto flex items-center justify-around">
        {chartFilter.map((title) => (
          <li
            className={`cursor-pointer rounded-md px-[1px] py-2 text-center text-xs text-light-secondaryTextColor dark:text-[#a7a7cc] md:text-sm ${
              selectedFilter.period && title.id === selectedFilter.id
                ? "border-[1px] border-common-azure"
                : ""
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
