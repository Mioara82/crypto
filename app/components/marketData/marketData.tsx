"use-client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { fetchMarketData } from "../../../lib/features/marketSlice";
import { RootState } from "@/lib/store";
import { formatMarketCap } from "../../utils/formatHelpers";
import CoinIcon from "@/app/icons/coinIcon";
import ExchangeIcon from "@/app/icons/exchangeIcon";
import CoolIcon from "@/app/icons/coolIcon";
import BitcoinIcon from "@/app/icons/bitcoinIcon";
import EthereumIcon from "@/app/icons/ethereumIcon";
import ProgressBar from "../progressBar";

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

  const coinData = marketData.data.active_cryptocurrencies;
  const btcMarketCapPercentage =
    marketData.data.market_cap_percentage.btc.toFixed(0);
  const ethMarketCapPercentage =
    marketData.data.market_cap_percentage.eth.toFixed(0);
  const totalMarketCap = formatMarketCap(marketData.data.total_market_cap.usd);
  const totalVolume = formatMarketCap(marketData.data.total_volume.usd);
  const exchange = marketData.data.markets;

  return (
    <nav className="flex justify-center my-2 m-0 bg-light-darkBg py-4 rounded-t-md max-w-1440">
      {loadingStatus === "fulfilled" && (
        <div className="inline-flex gap-2 text-xs ">
          <div className="inline-flex justify-items-center gap-1 text-light-lightTextColor">
            <CoinIcon />
            Coins
          </div>
          <div className="text-light-primary">{coinData}</div>
          <div className="inline-flex justify-items-center gap-1 text-light-lightTextColor">
            <ExchangeIcon />
            Exchange
          </div>
          <div className="text-light-primary">{exchange}</div>
          <div className="inline-flex justify-items-center gap-1 text-light-lightTextColor">
            <CoolIcon />
            <div className="text-light-primary">{totalMarketCap}</div>
          </div>
          <div>
            <div className="text-light-primary">${totalVolume}</div>
            <ProgressBar value={totalVolume} />
          </div>
          <div className="inline-flex justify-items-center items-center gap-1 text-light-lightTextColor">
            <BitcoinIcon />
            <div>{btcMarketCapPercentage}%</div>
            <ProgressBar value={btcMarketCapPercentage} orange />
          </div>
          <div className="inline-flex justify-items-center items-center gap-1 text-light-lightTextColor">
            <EthereumIcon />
            <div>{ethMarketCapPercentage}%</div>
            <ProgressBar value={ethMarketCapPercentage} purple />
          </div>
        </div>
      )}
      {loadingStatus === "rejected" && <p>Error: {error}</p>}
    </nav>
  );
};

export default MarketData;
