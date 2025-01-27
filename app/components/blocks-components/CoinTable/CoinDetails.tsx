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
      <tr key={coin.id} className="h-[77px] bg-light-primary dark:bg-[#191925]">
        <td className="p-4">{index + 1}</td>
        <td>
          {isError && (
            <NotificationCard isSuccess={false} text="Error fetching data" />
          )}
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="flex gap-4">
              <NotificationCard isSuccess={isSuccess} text="Coin data loaded" />
              <Image
                className="max-w-6"
                src={coin.image}
                width={24}
                height={24}
                alt="Coin icon"
              />
              <div className="max-w-[30px]">
                <Link href={`/CoinDetails/${coin.id}`} className="text-[17px]">
                  {coin.name}({coin.symbol}){isFetching ? "..." : ""}
                </Link>
              </div>
            </div>
          )}
        </td>
        <td className="text-base">
          {currencySymbol}
          {checkIfIsInteger(coin.currentPrice)}
        </td>
        <td>
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
        <td>
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
        <td>
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
                value={Math.round((coin.totalVolume / coin.marketCap) * 100)}
                color={coinTableColors[index % 10]}
                colorTwo={hexToRgba(coinTableColors[index % 10], 0.4)}
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
        <td className="px-1.5">
          <TableChart data={coin.sparkline.price} index={index} />
        </td>
      </tr>
    </>
  );
};

export default CoinDetails;
