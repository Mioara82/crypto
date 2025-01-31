"use client";
import { useState, useEffect } from "react";
import { useGetCoinsTableDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { InfiniteCoinScroll } from "./InfiniteScroll";
import NotificationCard from "../../UI-components/NotificationCard";
import TableSkeleton from "../../UI-components/Skeleton/TableSkeleton";
import { TableTitle } from "./TableTitle";
import { CirclesIcon } from "@/app/icons/circles";
import { Coin } from "@/lib/types/types";

export const queriesAPI = [
  "market_cap_asc",
  "market_cap_desc",
  "volume_asc",
  "volume_desc",
  "id_asc",
  "id_desc",
];

const CoinsTable = () => {
  const currency = useAppSelector((state: RootState) =>
    state.currency.currencyName.toLowerCase(),
  );

  const [sortQuery, setSortQuery] = useState(queriesAPI[1]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const coinsPerPage = 20;

  const { data, isSuccess, isLoading, isError, refetch, isFetching } =
    useGetCoinsTableDataQuery({
      currency,
      coinsPerPage: coinsPerPage,
      currentPage,
      sortQuery: sortQuery,
    });

  const [coins, setCoins] = useState<Coin[] | null>(data || null);

  const fetchMoreData = () => {
    if(!isFetching || !isLoading)
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 600000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  useEffect(() => {
    if (isSuccess && data) {
      setCoins((prevCoins) =>
        prevCoins && currentPage > 1 ? [...prevCoins, ...data] : data,
      );
    }
  }, [data, isSuccess]);

  const handleSortChange = (value: string) => {
    setSortQuery(value);
    setCoins(null);
    setCurrentPage(1);
  };

  return (
    <div className="relative w-full overscroll-none">
      <div className="flex w-full items-center justify-center">
        <div className="mr-auto flex items-center justify-center gap-5">
          <CirclesIcon />
          <TableTitle value={sortQuery} handleSortChange={handleSortChange} />
        </div>
      </div>
      {isSuccess && coins && coins?.length > 0 ? (
        <>
          <NotificationCard isSuccess={isSuccess} text="Coin data loaded" />
          <InfiniteCoinScroll
            fetchMoreData={fetchMoreData}
            isSuccess={isSuccess}
            isFetching={isFetching}
            isLoading={isLoading}
            isError={isError}
            coins={coins}
          />
        </>
      ) : (
        <>
          <NotificationCard isSuccess={false} text="Failed loading data" />
          <TableSkeleton />
        </>
      )}
    </div>
  );
};

export default CoinsTable;
