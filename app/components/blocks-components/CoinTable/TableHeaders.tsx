import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

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
  return (
    <tr className="text-left text-sm">
      <th className="w-[3%]">#</th>
      {headers.map((header) => (
        <th
          key={header.key}
          onClick={() => handleSort(header.key)}
          className={`${header.key === "name" ? "w-[12%]" : "w-[7%]"}`}
        >
          <div className="flex gap-2 items-center">
            <div>{header.label}</div>
            <span className="cursor-pointer">
              {sortValue === header.key
                ? direction === "asc"
                  ? <FiChevronUp/>
                  : <FiChevronDown/>
                : <FiChevronUp/>}
            </span>
          </div>
        </th>
      ))}
      <th className="w-[21%] px-1.5">24h volume / Market Cap</th>
      <th className="w-[21%] px-1.5">Circulating /Total Supply</th>
      <th className="w-[12%] px-1.5">
        <p>Last 7 days</p>
      </th>
    </tr>
  );
};

export default TableHeaders;
