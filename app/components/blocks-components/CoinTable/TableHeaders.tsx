import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface Key {
  [key: string]: string;
}

const TableHeaders = ({
  direction,
  sortValue,
  handleSort,
}: {
  direction: string;
  sortValue: string;
  handleSort: any;
}) => {
  const headers = [
    { key: "name", label: "Name" },
    { key: "currentPrice", label: "Price" },
    {
      key: "priceChangePercentage1h",
      label: "1h %",
    },
    {
      key: "priceChangePercentage24h",
      label: "24h %",
    },
    {
      key: "priceChangePercentage7d",
      label: "7d %",
    },
  ];
  //I created an object to be used for conditional rendering the header classes in jsx
  const classObj: Key = {
    name: "w-[40%] sm:w-[15%] pl-2",
    priceChangePercentage1h: "hidden sm:block sm:w-[8%]",
    priceChangePercentage24h: "hidden sm:block sm:w-[8%]",
    priceChangePercentage7d: "hidden sm:block sm:w-[8%]",
  };

  return (
    <tr className="mb-2 flex h-[77px] w-full items-center justify-around rounded-md px-2 text-sm md:justify-between">
      <th className="w-[20%] sm:w-[5%]">#</th>
      {headers.map((header) => (
        <th
          key={header.key}
          onClick={() => handleSort(header.key)}
          className={(classObj as Key)[header.key] || "w-[30%] sm:w-[8%]"}
        >
          <div className="flex items-center gap-2">
            <div>{header.label}</div>
            <span className="cursor-pointer">
              {sortValue === header.key ? (
                direction === "asc" ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )
              ) : (
                <FiChevronUp />
              )}
            </span>
          </div>
        </th>
      ))}
      <th className="hidden lg:block lg:w-[15%]">24h volume / Market Cap</th>
      <th className="hidden xl:block xl:w-[15%]">Circulating /Total Supply</th>
      <th className="hidden px-1.5 2xl:block 2xl:w-[16%]">
        <p>Last 7 days</p>
      </th>
    </tr>
  );
};

export default TableHeaders;
