"use client";
import { useState, useEffect } from "react";
import { useGetCoinsTableDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { InfiniteCoinScroll } from "./InfiniteScroll";
import TableButtons from "./TableButtons";
import BackToTopButton from "./BackToTopButton";
import CoinDetails from "./Coin";
import Button from "../../UI-components/Button";
import NotificationCard from "../../UI-components/NotificationCard";
import { TableRow } from "./TableRow";
import { TableTitle } from "./TableTitle";
import { ArrowIcon } from "@/app/icons/arrowIcon";
import { CirclesIcon } from "@/app/icons/circles";

import { Coin } from "@/lib/types/types";
import TableSkeleton from "../../UI-components/Skeleton/TableSkeleton";

const CoinsTable = () => {
  const currency = useAppSelector((state: RootState) =>
    state.currency.currencyName.toLowerCase()
  );
  const queriesAPI = [
    "market_cap_asc",
    "market_cap_desc",
    "volume_asc",
    "volume_desc",
  ];
  const [sortQuery, setSortQuery] = useState(queriesAPI[1]);
  const [sortBy, setSortBy] = useState<{ key: string; direction: string }>({
    key: "",
    direction: "asc",
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const coinsPerPage = 20;
  const startIndex = (currentPage - 1) * coinsPerPage;

  const { data, isSuccess, isError, refetch, isFetching } =
    useGetCoinsTableDataQuery({
      currency,
      coinsPerPage: coinsPerPage,
      currentPage,
      sortQuery: sortQuery,
    });

  const [coins, setCoins] = useState<Coin[] | null>(data || null);
  const [pageView, setPageView] = useState("Pagination");

  const handlePageView = () => {
    setPageView(pageView === "Pagination" ? "Scroll" : "Pagination");
  };

  const fetchMoreData = () => {
    setCurrentPage((prevPage) => ++prevPage);
  };

  useEffect(() => {
    if (!data) return;
    const intervalId = setInterval(() => {
      refetch();
    }, 600000);
    return () => clearInterval(intervalId);
  }, [data, refetch]);

  useEffect(() => {
    if (isSuccess && pageView === "Pagination") {
      setCoins(coins);
    }
    if (isSuccess && pageView === "Scroll" && !isFetching) {
      setCoins((prevCoins) =>
        prevCoins && prevCoins.length ? [...prevCoins, ...data] : data
      );
    }
  }, [data, coins, isSuccess, isFetching, pageView]);

  const handleSort = (value: string) => {
    let newSortQuery;
    switch (value) {
      case "market_cap_asc":
        newSortQuery = "market_cap_desc";
        break;
      case "market_cap_desc":
        newSortQuery = "volume_asc";
        break;
      case "volume_asc":
        newSortQuery = "volume_desc";
        break;
      case "volume_desc":
        newSortQuery = "market_cap_asc";
        break;
      default:
        newSortQuery = "market_cap_asc";
    }
    const found = queriesAPI.find((q: string) => q === newSortQuery);
    if (found) {
      setSortQuery(found);
    }
  };

  const handleSortInTable = (value: string) => {
    setSortBy((prev) => ({
      key: value,
      direction: prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = isSuccess
    ? coins?.slice().sort((a: any, b: any) => {
        if (sortBy.key === "name") {
          return sortBy.direction === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else {
          return (
            (sortBy.direction === "asc" ? a[sortBy.key] : b[sortBy.key]) -
            (sortBy.direction === "asc" ? b[sortBy.key] : a[sortBy.key])
          );
        }
      })
    : [];

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage !== 1 && currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="relative overscroll-none w-full">
      <Button
        onButtonClick={handlePageView}
        feature="Pagination"
        text={pageView === "Pagination" ? "Scroll" : "Pagination"}
      />
      <div className="w-full flex justify-center items-center">
        <div className="flex justify-center items-center gap-5 mr-auto">
          <CirclesIcon />
          <TableTitle value={sortQuery} />
          <ArrowIcon handleClick={() => handleSort(sortQuery)} />
        </div>
      </div>
      {isSuccess ? (
        <>
          <NotificationCard isSuccess={isSuccess} text="Coin data loaded" />
          {pageView === "Scroll" ? (
            <>
              <InfiniteCoinScroll
                sortBy={sortBy}
                handleSortInTable={handleSortInTable}
                fetchMoreData={fetchMoreData}
                isSuccess={isSuccess}
                isFetching={isFetching}
                sortedData={sortedData || []}
                startIndex={startIndex}
              />
              <BackToTopButton />
            </>
          ) : (
            <>
              <table className="table-auto flex flex-col w-full text-sm text-light-secondaryTextColor dark:text-dark-chartTextColor border-separate border-spacing-y-5 space-y-2">
                <tbody>
                  <TableRow
                    sort={sortBy.key}
                    order={sortBy.direction}
                    handleSort={() => handleSortInTable(sortBy.key)}
                  />
                  {sortedData &&
                    pageView === "Pagination" &&
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
              <div>
                <div className="flex gap-2 ml-auto pr-3">
                  <TableButtons
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                  />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <NotificationCard isSuccess={isError} text="Failed loading data" />
          <TableSkeleton />
        </>
      )}
    </div>
  );
};

export default CoinsTable;
