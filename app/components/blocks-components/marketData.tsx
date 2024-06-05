"use-client";
import React from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useGetMarketDataQuery } from "@/lib/api";
import MarketDataInfo from "../UI-components/MarketDataInfo";
import Spinner from "../UI-components/Spinner";
import { RootState } from "@/lib/store";

const MarketData = () => {
  const { data, isSuccess } = useGetMarketDataQuery("");
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName
  ).toLowerCase();
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );

  return (
    <>
      {isSuccess ? (
        <MarketDataInfo
          data={data}
          currency={currency}
          currencySymbol={currencySymbol}
        />
      ) : (
        <div>
          <Spinner />
          <p>Loading data, please wait...</p>
        </div>
      )}
    </>
  );
};

export default MarketData;
