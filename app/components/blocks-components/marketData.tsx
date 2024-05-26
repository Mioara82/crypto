"use-client";
import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { useGetMarketDataQuery } from "@/lib/api";
import {
  selectCurrency,
  selectCurrencySymbol,
} from "@/lib/features/appSettingsSlice";
import CoinIcon from "@/app/icons/coinIcon";
import ExchangeIcon from "@/app/icons/exchangeIcon";
import ArrowIcon from "@/app/icons/arrowIcon";
import BitcoinIcon from "@/app/icons/bitcoinIcon";
import EthereumIcon from "@/app/icons/ethereumIcon";
import ProgressBar from "@/app/components/UI-components/progressBar";
import { formatMarketCap, roundNumber } from "@/app/utils/formatHelpers";
import { useTheme } from "next-themes";

const MarketData = () => {
  const { theme } = useTheme();
  const { data, isLoading, isError, isSuccess } = useGetMarketDataQuery("");
  const currency = useAppSelector(selectCurrency).toLowerCase();
  const currencySymbol = useAppSelector(selectCurrencySymbol);

  if (!data || isLoading) {
    return <div>Loading data...</div>;
  }
  if (isError) {
    return <p>Error: something went wrong</p>;
  }

  return (
    isSuccess && (
      <nav
        className={`flex justify-around m-0 flex-nowrap ${
          theme === "dark" ? "bg-dark-darkBg" : "bg-light-darkBg"
        } py-4 rounded-t-md max-w-1440`}
      >
        {data && (
          <div className="flex gap-8 text-xs ">
            <div className="inline-flex justify-items-center gap-2">
              <div className="inline-flex justify-items-center gap-1 text-light-lightTextColor">
                <CoinIcon />
                Coins
              </div>
              <div className="text-light-primary">{data.coinData}</div>
            </div>

            <div className="inline-flex justify-items-center gap-2">
              <div className="inline-flex justify-items-center gap-1 text-light-lightTextColor">
                <ExchangeIcon />
                Exchange
              </div>
              <div className="text-light-primary">{data.exchange}</div>
            </div>

            <div className="inline-flex justify-items-center gap-1 text-light-lightTextColor">
              <ArrowIcon />
              <div className="text-light-primary">
                {formatMarketCap(data.totalMarketCap[currency])}
              </div>
            </div>
            <div className="inline-flex justify-items-center items-center gap-2">
              <div className="text-light-primary">
                {currencySymbol}
                <span className="ml-1">{formatMarketCap(data.totalVolumePerCurrency[currency])}</span>
              </div>
              <ProgressBar value={5} color="#ffffff" />
            </div>

            <div className="inline-flex justify-items-center items-center gap-[5px] text-light-lightTextColor">
              <BitcoinIcon />
              <div>{roundNumber(data.btcMarketCapPercentage)}%</div>
              <ProgressBar
                value={data.btcMarketCapPercentage}
                color="#F7931A"
              />
            </div>

            <div className="inline-flex justify-items-center items-center gap-[5px] text-light-lightTextColor">
              <EthereumIcon />
              <div>{roundNumber(data.ethMarketCapPercentage)}%</div>
              <ProgressBar
                value={data.ethMarketCapPercentage}
                color="#849DFF"
              />
            </div>
          </div>
        )}
      </nav>
    )
  );
};

export default MarketData;
