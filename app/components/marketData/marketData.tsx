"use-client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { fetchMarketData } from "../../../lib/features/marketSlice";
import { RootState } from "@/lib/store";
import { formatMarketCap } from "../../utils/formatHelpers";

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
    <nav className="flex justify-center my-2 bg-light-darkBg py-4 gap-8 rounded-t-md max-w-1440">
      {loadingStatus === "fulfilled" && (
        <ul className="inline-flex gap-2 font-SpaceGrotesk text-xs text-light-lightTextColor">
          <li>Coins {coinData}</li>
          <li>Exchange {exchange}</li>
          <li>{btcMarketCapPercentage}</li>
          <li>{ethMarketCapPercentage}</li>
          <li>{totalMarketCap}</li>
          <li>{totalVolume}</li>
        </ul>
      )}
      {loadingStatus === "rejected" && <p>Error: {error}</p>}
    </nav>
  );
};

export default MarketData;
