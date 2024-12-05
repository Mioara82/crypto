import React from "react";
import { SortingIcon } from "@/app/icons/sortingIcon";

interface ColumnNameProps {
  children: React.ReactNode;
  sort: string;
  order: string;
  onClick: () => void;
}

const ColumnName: React.FC<ColumnNameProps> = ({
  children,
  onClick,
}) => {
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export const TableRow = ({
  handleSortInTable,
}: {
  order: string;
  sort: string;
  handleSortInTable: () => void;
}) => {
  return (
    <tr className="text-left text-sm">
      <th className="w-[3%]">#</th>
      <th className="w-[12%] flex items-center justify-center border-skeleton100">
        <p>Name</p>
        <ColumnName sort="name" order="asc" onClick={handleSortInTable}>
          <SortingIcon />
        </ColumnName>
      </th>
      <th className="w-[10%] ">
        <p>Price</p>
        <ColumnName sort="current_price" order="asc" onClick={handleSortInTable}>
          <SortingIcon />
        </ColumnName>
      </th>
      <th className="w-[7%] ">
        <p>1h %</p>
        <ColumnName
          sort="price_change_percentage_1h_in_currency"
          order="asc"
          onClick={handleSortInTable}
        >
          <SortingIcon />
        </ColumnName>
      </th>
      <th className="w-[7%] ">
        <p>24h %</p>
        <ColumnName
          sort="price_change_percentage_24h_in_currency"
          order="asc"
          onClick={handleSortInTable}
        >
          <SortingIcon />
        </ColumnName>
      </th>
      <th className="w-[7%] ">
        <p>7d %</p>
        <ColumnName
          sort="price_change_percentage_7d_in_currency"
          order="asc"
          onClick={handleSortInTable}
        >
          <SortingIcon />
        </ColumnName>
      </th>
      <th className="w-[21%] px-1.5">24h volume / Market Cap</th>
      <th className="w-[21%] px-1.5">Circulating /Total Supply</th>
      <th className="w-[12%] px-1.5">
        <p>Last 7 days</p>
      </th>
    </tr>
  );
};
