import React, { useState, useRef } from "react";
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
  const isInitialLoad = useRef(true);
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
  const handleFetchMoreData = () => {
    if (isInitialLoad.current === true) isInitialLoad.current = false;
    fetchMoreData();
  };
  return (
    <div id="scrollableDiv" className="h-full overflow-y-auto">
      <InfiniteScroll
        dataLength={10000}
        next={handleFetchMoreData}
        hasMore={true}
        loader={
          (isInitialLoad.current || isLoading || isFetching) && <Spinner />
        }
        endMessage={<p className="text-center">No more data to show</p>}
        scrollableTarget="scrollableDiv"
        scrollThreshold={0.8}
      >
        <table className="w-full">
          <tbody>
            <TableHeaders
              sortValue={sortConfig.key}
              direction={sortConfig.direction}
              handleSort={handleSort}
            />
            {isInitialLoad.current && isLoading && (
              <tr>
                <td colSpan={9} className="text-center">
                  <Spinner />
                </td>
              </tr>
            )}
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
    </div>
  );
};
