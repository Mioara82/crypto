import React, { useState, useRef } from "react";
import { Coin } from "@/lib/types/types";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
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

const InfiniteCoinScroll: React.FC<InfiniteCoinScrollProps> = ({
  fetchMoreData,
  isSuccess,
  isLoading,
  isError,
  isFetching,
  coins,
}) => {
  const isInitialLoad = useRef<boolean>(true);
  const targetRef = useRef<HTMLTableElement>(null);
  const observerRef = useInfiniteScroll(handleFetchMoreData);
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

  function handleFetchMoreData() {
    if (isInitialLoad.current === true) isInitialLoad.current = false;
    fetchMoreData();
  }

  const scrollToTop = () =>
    targetRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <div>
        <table className="w-full scroll-mt-24" ref={targetRef}>
          <tbody>
            <TableHeaders
              sortValue={sortConfig.key}
              direction={sortConfig.direction}
              handleSort={handleSort}
            />
            {isSuccess &&
              sortedData.map((coin: Coin, index: number) => (
                <CoinDetails
                  key={coin.id}
                  isFetching={isFetching}
                  coin={coin}
                  index={index}
                  isLoading={isLoading}
                  isError={isError}
                />
              ))}
            <tr ref={observerRef}>
              <td colSpan={9} className="text-center">
                {isLoading && <h3>Loading data</h3>}
              </td>
            </tr>
          </tbody>
        </table>
        <BackToTopButton handleScroll={scrollToTop} />
      </div>
    </>
  );
};

export default InfiniteCoinScroll;