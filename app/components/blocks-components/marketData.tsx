"use-client";
import React from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useGetMarketDataQuery } from "@/lib/api";
import MarketDataInfo from "../UI-components/MarketDataInfo";
import { RootState } from "@/lib/store";
import Spinner from "../UI-components/Spinner";

const MarketData = () => {
  const { data, isSuccess, isLoading} = useGetMarketDataQuery({
    endpoint: "MarketData",
  });
  
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName,
  ).toLowerCase();
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol,
  );

  if(isLoading){
    return <Spinner />;
  }

  return (
    <div className="relative">
        {isSuccess && (
          <div>
            <MarketDataInfo
              data={data}
              currency={currency}
              currencySymbol={currencySymbol}
            />
          </div>
        )}
    </div>
  );
};

export default MarketData;
