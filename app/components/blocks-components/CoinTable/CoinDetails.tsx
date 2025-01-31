import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { Coin } from "@/lib/types/types";
import TableChart from "../Charts/TableChart";
import ArrowIconCarousel from "@/app/icons/arrowIconCarousel";
import ProgressBar from "../../UI-components/progressBar";
import Spinner from "../../UI-components/Spinner";
import NotificationCard from "../../UI-components/NotificationCard";
import {
  checkIfIsInteger,
  formatMarketCap,
  hexToRgba,
} from "@/app/utils/formatHelpers";
import { coinTableColors } from "@/app/utils/colours";

const CoinDetails = ({
  coin,
  index,
  isFetching,
  isLoading,
  isError,
  isSuccess,
}: {
  coin: Coin;
  index: number;
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}) => {
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol,
  );
  return (
    <>
      <NotificationCard isSuccess={isSuccess} text="Coin data loaded" />
      <tr
        key={coin.id}
        className="mb-2 flex h-[77px] border-[1px] border-light-lightBg dark:border-none w-full min-w-full items-center justify-around overflow-x-auto scroll-smooth rounded-lg from-dark-darkBg via-dark-lightBg to-dark-hover px-2 duration-200 hover:scale-102 hover:transform hover:cursor-pointer hover:shadow-2xl dark:bg-gradient-to-r md:justify-between"
      >
        <td className="w-[20%] text-center sm:w-[5%]">{index + 1}</td>
        <td className="w-[50%] sm:w-[15%]">
          {isError && (
            <NotificationCard isSuccess={false} text="Error fetching data" />
          )}
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="flex xs:gap-2">
              <div className="relative h-6 w-6">
                <Image
                  className="max-w-6"
                  src={coin.image}
                  fill
                  style={{ objectFit: "contain" }}
                  alt="Coin icon"
                />
              </div>
              <div>
                <Link
                  href={`/CoinDetails/${coin.id}`}
                  className="text-sm xs:text-base sm:text-sm"
                >
                  {coin.name}({coin.symbol}){isFetching ? "..." : ""}
                </Link>
              </div>
            </div>
          )}
        </td>
        <td className="w-[30%] text-sm xs:text-base sm:w-[8%] sm:text-sm">
          {currencySymbol}
          {checkIfIsInteger(coin.currentPrice)}
        </td>
        <td className="hidden sm:block sm:w-[8%]">
          <div className="flex gap-1">
            <ArrowIconCarousel isPositive={coin.priceChangePercentage1h > 0} />
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
        <td className="hidden sm:block sm:w-[8%]">
          <div className="flex gap-1">
            <ArrowIconCarousel isPositive={coin.priceChangePercentage24h > 0} />
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
        <td className="hidden sm:block sm:w-[8%]">
          <div className="flex gap-1">
            <ArrowIconCarousel isPositive={coin.priceChangePercentage7d > 0} />
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
        <td className="hidden px-1.5 lg:block lg:w-[15%]">
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
                value={Math.round((coin.totalVolume / coin.marketCap) * 100)}
                color={coinTableColors[index % 10]}
                colorTwo={hexToRgba(coinTableColors[index % 10], 0.4)}
              />
            </div>
          </div>
        </td>
        <td className="hidden px-1.5 xl:block xl:w-[15%]">
          {" "}
          <div className="flex flex-col gap-1">
            <div className="flex">
              <span className="text-xs">
                {currencySymbol}
                {formatMarketCap(coin.circulatingSupply)}
              </span>
              <span className="ml-auto text-xs">
                {currencySymbol}
                {formatMarketCap(coin.totalSupply)}
              </span>
            </div>
            <ProgressBar
              value={Math.round(
                (coin.circulatingSupply / coin.totalSupply) * 100,
              )}
              color={coinTableColors[index % 10]}
              colorTwo={hexToRgba(coinTableColors[index % 10], 0.4)}
            />
          </div>
        </td>
        <td className="hidden px-1.5 2xl:block 2xl:w-[16%]">
          <TableChart data={coin.sparkline.price} index={index} />
        </td>
      </tr>
    </>
  );
};

export default CoinDetails;
