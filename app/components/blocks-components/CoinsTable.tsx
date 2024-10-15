"use client";
import { useState } from "react";
import Image from "next/image";
import { useGetCoinsTableDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import TableChart from "./Charts/TableChart";
import ProgressBar from "../UI-components/progressBar";
import ArrowIconCarousel from "@/app/icons/arrowIconCarousel";
import { formatMarketCap, checkIfIsInteger } from "@/app/utils/formatHelpers";
import { coinTableColors } from "@/app/utils/colours";

const CoinsTable: React.FC = () => {
  const currency = useAppSelector((state: RootState) =>
    state.currency.currencyName.toLowerCase()
  );
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coinsPerPage = 50;
  const startIndex = (currentPage - 1) * coinsPerPage;

  const { data, isSuccess } = useGetCoinsTableDataQuery({
    currency,
    coinsPerPage: 50,
    currentPage,
  });

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage !== 1 && currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex flex-col">
      <table className="table-auto w-full text-sm text-light-secondaryTextColor dark:text-dark-chartTextColor border-separate border-spacing-y-5 space-y-2">
        <tbody>
          <tr className=" text-left text-sm">
            <th className="w-[3%]">#</th>
            <th className="w-[12%]">Name</th>
            <th className="w-[10%] ">Price</th>
            <th className="w-[7%]">1h %</th>
            <th className="w-[7%]">24h %</th>
            <th className="w-[7%]">7d %</th>
            <th className="w-[21%] px-1.5">24h volume / Market Cap</th>
            <th className="w-[21%] px-1.5">Circulating /Total Supply</th>
            <th className="w-[12%] px-1.5">Last 7 days</th>
          </tr>
          {isSuccess &&
            data?.map((coin, index) => (
              <tr
                key={coin.id}
                className="h-[77px] dark:bg-[#191925] bg-light-primary"
              >
                <td className="p-4 ">{startIndex + index + 1}</td>
                <td>
                  <div className="flex gap-4">
                    <Image
                      src={coin.image}
                      width={24}
                      height={24}
                      alt="Coin icon"
                    />
                    <span className="text-[17px]">
                      {coin.name}({coin.symbol})
                    </span>
                  </div>
                </td>
                <td className="text-base">
                  {currencySymbol}
                  {checkIfIsInteger(coin.currentPrice)}
                </td>
                <td>
                  <div className="flex gap-1">
                    <ArrowIconCarousel
                      isPositive={coin.priceChangePercentage1h > 0}
                    />
                    <span
                      className={`text-xs ${
                        coin.priceChangePercentage1h > 0
                          ? "text-[#01f1e3]"
                          : "text-[#fe2264]"
                      }`}
                    >
                      {checkIfIsInteger(coin.priceChangePercentage1h)}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex gap-1">
                    <ArrowIconCarousel
                      isPositive={coin.priceChangePercentage24h > 0}
                    />
                    <span
                      className={`text-xs ${
                        coin.priceChangePercentage24h > 0
                          ? "text-[#01f1e3]"
                          : "text-[#fe2264]"
                      }`}
                    >
                      {checkIfIsInteger(coin.priceChangePercentage24h)}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex gap-1">
                    <ArrowIconCarousel
                      isPositive={coin.priceChangePercentage7d > 0}
                    />
                    <span
                      className={`text-xs ${
                        coin.priceChangePercentage7d > 0
                          ? "text-[#01f1e3]"
                          : "text-[#fe2264]"
                      }`}
                    >
                      {checkIfIsInteger(coin.priceChangePercentage7d)}
                    </span>
                  </div>
                </td>
                <td className="px-1.5">
                  <div className="flex flex-col gap-1">
                    <div className="flex">
                      <span className="text-xs">
                        {currencySymbol}
                        {formatMarketCap(coin.totalVolume)}
                      </span>
                      <span className="ml-auto text-xs">
                        {currencySymbol}
                        {formatMarketCap(coin.marketCap)}
                      </span>
                    </div>
                    <div className="w-full">
                      <ProgressBar
                        value={Math.round(
                          (coin.totalVolume / coin.marketCap) * 100
                        )}
                        color={coinTableColors[index % 10]}
                        colorTwo={`rgba(${parseInt(
                          coinTableColors[index % 10].substring(1, 3),
                          16
                        )}, 
                   ${parseInt(coinTableColors[index % 10].substring(3, 5),16)}, 
                   ${parseInt(coinTableColors[index % 10].substring(5, 7),16)}, 0.4)`}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-1.5">
                  {" "}
                  <div className="flex flex-col gap-1">
                    <div className="flex">
                      <span className="text-xs">
                        {currencySymbol}
                        {formatMarketCap(coin.circulatingSupply)}
                      </span>
                      <span className="text-xs ml-auto">
                        {currencySymbol}
                        {formatMarketCap(coin.totalSupply)}
                      </span>
                    </div>
                    <ProgressBar
                      value={Math.round(
                        (coin.circulatingSupply / coin.totalSupply) * 100
                      )}
                      color={coinTableColors[index % 10]}
                      colorTwo={`rgba(${parseInt(
                        coinTableColors[index % 10].substring(1, 3),
                        16
                      )}, 
                   ${parseInt(coinTableColors[index % 10].substring(3, 5),16)}, 
                   ${parseInt(coinTableColors[index % 10].substring(5, 7),16)}, 0.4)`}
                    />
                  </div>
                </td>
                <td className="px-1.5">
                  <TableChart data={coin.sparkline.price} index={index} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="w-10 flex gap-20 m-auto">
        <button onClick={handlePrevPage}>{currentPage}</button>
        <button onClick={handleNextPage}>{currentPage + 1}</button>
      </div>
    </div>
  );
};

export default CoinsTable;
