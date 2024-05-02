"use-client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { fetchMarketData } from "../../../lib/features/marketSlice";
import { RootState } from "@/lib/store";
import CoinIcon from "@/app/icons/coinIcon";
import ExchangeIcon from "@/app/icons/exchangeIcon";
import ArrowIcon from "@/app/icons/arrowIcon";
import BitcoinIcon from "@/app/icons/bitcoinIcon";
import EthereumIcon from "@/app/icons/ethereumIcon";
import ProgressBar from "../progressBar";
 import { formatMarketCap } from "@/app/utils/formatHelpers";

const MarketData = () => {
  const dispatch = useAppDispatch();
  const marketData = useAppSelector((state: RootState) => state.market.data);
  const loadingStatus = useAppSelector(
    (state: RootState) => state.market.loading
  );
  const error = useAppSelector((state: RootState) => state.market.error);

  useEffect(() => {
    dispatch(fetchMarketData());
  }, [dispatch]);

  if (!marketData || loadingStatus === "pending") {
    return <div>Loading data...</div>;
  }

  const getTotalMarketVolume = () =>{
    if(marketData && marketData.totalVolume){
      const totalMarketVolume = Object.values(marketData.totalVolume).reduce(
      (a, b) => a + b,
      0
    );
  return totalMarketVolume;
    }
};
  const currencyVolumeRatio = (
    (marketData?.totalVolumePerCurrency / getTotalMarketVolume()) *
    100
  ).toFixed(3);

  return (
    marketData && (
      <nav className="flex justify-around my-2 m-0 flex-nowrap bg-light-darkBg py-4 rounded-t-md max-w-1440">
        {loadingStatus === "fulfilled" && (
          <div className="flex gap-2 text-xs ">
            <div className="inline-flex justify-items-center gap-1 text-light-lightTextColor">
              <CoinIcon />
              Coins
            </div>
            <div className="text-light-primary">{marketData.coinData}</div>
            <div className="inline-flex justify-items-center gap-1 text-light-lightTextColor">
              <ExchangeIcon />
              Exchange
            </div>
            <div className="text-light-primary">{marketData.exchange}</div>
            <div className="inline-flex justify-items-center gap-1 text-light-lightTextColor">
              <ArrowIcon />
              <div className="text-light-primary">
                {marketData.totalMarketCap}
              </div>
            </div>
            <div>
              <div className="text-light-primary">${formatMarketCap(marketData.totalVolumePerCurrency)}</div>
              <ProgressBar value={currencyVolumeRatio} />
            </div>
            <div className="inline-flex justify-items-center items-center gap-1 text-light-lightTextColor">
              <BitcoinIcon />
              <div>{marketData.btcMarketCapPercentage}%</div>
              <ProgressBar
                value={marketData.btcMarketCapPercentage}
                color="orange"
              />
            </div>
            <div className="inline-flex justify-items-center items-center gap-1 text-light-lightTextColor">
              <EthereumIcon />
              <div>{marketData.ethMarketCapPercentage}%</div>
              <ProgressBar
                value={marketData.ethMarketCapPercentage}
                color="purple"
              />
            </div>
          </div>
        )}
        {loadingStatus === "rejected" && <p>Error: {error}</p>}
      </nav>
    )
  );
  
};

export default MarketData;
