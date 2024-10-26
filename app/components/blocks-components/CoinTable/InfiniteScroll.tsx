import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Coin } from "@/lib/types/types";
import Spinner from "../../UI-components/Spinner";
import { TableRow } from "./TableRow";
import CoinDetails from "./CoinDetails";
import BackToTopButton from "./BackToTopButton";

interface InfiniteCoinScrollProps {
  sortBy: { key: string; direction: string };
  handleSortInTable: any;
  fetchMoreData: () => void;
  isSuccess: boolean;
  isFetching: boolean;
  sortedData: Coin[];
  startIndex: number;
}

export const InfiniteCoinScroll: React.FC<InfiniteCoinScrollProps> = ({
  sortBy,
  handleSortInTable,
  fetchMoreData,
  isSuccess,
  isFetching,
  sortedData,
  startIndex,
}) => {
  return (
    <InfiniteScroll
      dataLength={sortedData.length || 0}
      next={fetchMoreData}
      hasMore={true}
      scrollableTarget="scrollable-container"
      loader={<Spinner />}
      endMessage={<p className="text-center">No more data to show</p>}
    >
      <table className="table-auto flex flex-col w-full h-[600px] overflow-y-auto text-sm text-light-secondaryTextColor dark:text-dark-chartTextColor border-separate border-spacing-y-5 space-y-2">
        <tbody>
          <TableRow
            sort={sortBy.key}
            order={sortBy.direction}
            handleSort={() => handleSortInTable(sortBy.key)}
          />
          {isSuccess &&
            sortedData &&
            sortedData?.map((coin: Coin, index) => (
              <CoinDetails
                key={coin.id}
                isFetching={isFetching}
                coin={coin}
                index={index}
                startIndex={startIndex}
              />
            ))}
        </tbody>
      </table>
      <BackToTopButton />
    </InfiniteScroll>
  );
};
