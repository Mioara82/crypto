import React from "react";
import { capitaliseString } from "@/app/utils/formatHelpers";
import { queriesAPI } from "./CoinsTable";

export const TableTitle = ({value, handleSortChange}:{value: string, handleSortChange:any}) => {
  return (
    <div className="text-2xl flex items-center gap-4">
      TOP 50 <span className="text-lg">BY </span>
      <div className="relative w-56">
      <select className="w-full bg-light-primary dark:bg-dark-primaryBg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={value} onChange={handleSortChange}>
        {queriesAPI.map((query) => (
          <option key={query} value={query}>
            {capitaliseString(query)}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
};
