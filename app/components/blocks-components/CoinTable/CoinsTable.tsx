"use client";
import { useState, useEffect } from "react";
import { useGetCoinsTableDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useIsActive } from "@/lib/hooks/useIsActive";
import { RootState } from "@/lib/store";
import Button from "../../UI-components/Button";
import BackToTopButton from "./BackToTopButton";
import CoinDetails from "./CoinDetails";
import { TableRow } from "./TableRow";
import { TableTitle } from "./TableTitle";
import { ArrowIcon } from "@/app/icons/arrowIcon";
import { CirclesIcon } from "@/app/icons/circles";
import { Coin } from "@/lib/types/types";

const CoinsTable: React.FC = () => {
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

  const currency = useAppSelector((state: RootState) =>
    state.currency.currencyName.toLowerCase()
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const coinsPerPage = 50;
  const startIndex = (currentPage - 1) * coinsPerPage;
  const [isActive, setIsActive] = useIsActive(0);

  const { data, isSuccess, refetch, isFetching } = useGetCoinsTableDataQuery({
    currency,
    coinsPerPage: 50,
    currentPage,
    sortQuery: sortQuery,
  });
  const [coins, setCoins] = useState<Coin[] | null>(data || null);

  useEffect(() => {
    if (!data) return;
    const intervalId = setInterval(() => {
      refetch();
    }, 20000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  useEffect(() => {
    if (isSuccess) {
      setCoins(data);
    }
  }, [data, isSuccess]);

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

  const handleActiveButton = (value: number) => {
    setIsActive((prev) => (prev === value ? null : value));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage !== 1 && currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex flex-col relative">
      {isFetching && <div>data is being fetched</div>}
      <table className="table-auto flex flex-col w-full text-sm text-light-secondaryTextColor dark:text-dark-chartTextColor border-separate border-spacing-y-5 space-y-2">
        <thead>
          <tr className="w-full flex justify-center items-center">
            <th className="flex justify-center items-center gap-5 mr-auto">
              <CirclesIcon />
              <TableTitle value={sortQuery} />
              <ArrowIcon handleSort={() => handleSort(sortQuery)} />
            </th>
            <th className="flex gap-2 ml-auto pr-3">
              <Button
                onButtonClick={() => {
                  handlePrevPage();
                  handleActiveButton(0);
                }}
                text="Previous"
                isActive={isActive === 0}
                feature="table"
              />
              <Button
                onButtonClick={() => {
                  handleNextPage();
                  handleActiveButton(1);
                }}
                text="Next"
                isActive={isActive === 1}
                feature="table"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <TableRow
            sort={sortBy.key}
            order={sortBy.direction}
            handleSort={() => handleSortInTable(sortBy.key)}
          />
          {isSuccess &&
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
    </div>
  );
};

export default CoinsTable;
