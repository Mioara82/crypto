import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { Coin } from "@/lib/types/types";
import TableChart from "../Charts/TableChart";
import ArrowIconCarousel from "@/app/icons/arrowIconCarousel";
import ProgressBar from "../../UI-components/progressBar";
import {
  checkIfIsInteger,
  formatMarketCap,
  hexToRgba,
} from "@/app/utils/formatHelpers";
import { coinTableColors } from "@/app/utils/colours";

const CoinDetails = ({
  coin,
  index,
  startIndex,
}: {
  coin: Coin;
  index: number;
  startIndex: number;
}) => {
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );
  return (
    <>
      <tr key={coin.id} className="h-[77px] dark:bg-[#191925] bg-light-primary">
        <td className="p-4 ">{startIndex + index + 1}</td>
        <td>
          <div className="flex gap-4">
            <Image src={coin.image} width={24} height={24} alt="Coin icon" />
            <Link href={`/Coin/${coin.id}`} className="text-[17px]">
              {coin.name}({coin.symbol})
            </Link>
          </div>
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
