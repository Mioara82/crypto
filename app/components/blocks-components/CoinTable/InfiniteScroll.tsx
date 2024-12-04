import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Coin } from "@/lib/types/types";
import Spinner from "../../UI-components/Spinner";
import TableHeaders from "./TableHeaders";
import CoinDetails from "./CoinDetails";
import BackToTopButton from "./BackToTopButton";

interface InfiniteCoinScrollProps {
  fetchMoreData: () => void;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  coins: any;
}

export const InfiniteCoinScroll: React.FC<InfiniteCoinScrollProps> = ({
  fetchMoreData,
  isSuccess,
  isLoading,
  isError,
  isFetching,
  coins,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({
    key: "",
    direction: "asc",
  });
  const handleSort = (value: string) => {
    setSortConfig((prev) => ({
      key: value,
      direction:
        prev.key === value && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = isSuccess
    ? coins?.slice().sort((a: any, b: any) => {
        const aValue = a[sortConfig.key] ?? "";
        const bValue = b[sortConfig.key] ?? "";
        if (sortConfig.key === "name") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }
      })
    : coins;
  return (
    <InfiniteScroll
      dataLength={sortedData.length || 0}
      next={fetchMoreData}
      hasMore={true}
      loader={<Spinner />}
      endMessage={<p className="text-center">No more data to show</p>}
    >
      <table className="table-auto flex flex-col w-full h-auto overflow-y-auto text-sm text-light-secondaryTextColor dark:text-dark-chartTextColor border-separate border-spacing-y-5 space-y-2">
        <tbody>
          <TableHeaders
            sortValue={sortConfig.key}
            direction={sortConfig.direction}
            handleSort={handleSort}
          />
          {isLoading && <Spinner />}
          {isSuccess &&
            sortedData.map((coin: Coin, index: number) => (
              <CoinDetails
                key={coin.id}
                isFetching={isFetching}
                coin={coin}
                index={index}
                isSuccess={isSuccess}
                isLoading={isLoading}
                isError={isError}
              />
            ))}
        </tbody>
      </table>
      <BackToTopButton />
    </InfiniteScroll>
  );
};
