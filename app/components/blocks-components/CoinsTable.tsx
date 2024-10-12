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
      <table className="w-full text-sm text-light-secondaryTextColor dark:text-dark-chartTextColor ">
        <tbody>
          <tr className="py-4 px-5 text-center">
            <th className="p-4">#</th>
            <th className="w-[15%]">Name</th>
            <th className="w-[10%] ">Price</th>
            <th className="w-[5%]">1h %</th>
            <th className="w-[5%]">24h %</th>
            <th className="w-[5%]">7d %</th>
            <th className="w-[20%] ">24h volume / Market Cap</th>
            <th className="w-[20%]">Circulating /Total Supply</th>
            <th className="w-[20%] ">Last 7 days</th>
          </tr>
          {isSuccess &&
            data?.map((coin, index) => (
              <tr key={coin.id} className="h-[77px]">
                <td className="p-4">{startIndex + index + 1}</td>
                <td>
                  <div className="flex gap-4">
                    <Image
                      src={coin.image}
                      width={24}
                      height={24}
                      alt="Coin icon"
                    />
                    {coin.name}({coin.symbol})
                  </div>
                </td>
                <td>
                  {currencySymbol}
                  {checkIfIsInteger(coin.currentPrice)}
                </td>
                <td>
                  <div className="flex gap-1">
                    <ArrowIconCarousel
                      isPositive={coin.priceChangePercentage1h > 0}
                    />
                    <span className={`text-xs ${coin.priceChangePercentage1h > 0 ? "text-[#077f77]" : "text-[#fe2264]"}`}>
                      {checkIfIsInteger(coin.priceChangePercentage1h)}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex gap-1">
                    <ArrowIconCarousel
                      isPositive={coin.priceChangePercentage24h > 0}
                    />
                    <span className={`text-xs ${coin.priceChangePercentage24h > 0 ? "text-[#077f77]" : "text-[#fe2264]"}`}>
                      {checkIfIsInteger(coin.priceChangePercentage24h)}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex gap-1">
                    <ArrowIconCarousel
                      isPositive={coin.priceChangePercentage7d > 0}
                    />
                    <span className={`text-xs ${coin.priceChangePercentage7d > 0 ? "text-[#077f77]" : "text-[#fe2264]"}`}>
                      {checkIfIsInteger(coin.priceChangePercentage7d)}
                    </span>
                  </div>
                </td>
                <td>
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
                          (coin.totalVolume /
                            coin.marketCap) * 100
                        )}
                        color="#F7931A"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  <div className="flex flex-col gap-1 px-4">
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
                        (coin.circulatingSupply /
                          coin.totalSupply) *
                          100
                      )}
                      color="#F7931A"
                    />
                  </div>
                </td>
                <td>
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
