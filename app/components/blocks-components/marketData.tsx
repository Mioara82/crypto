"use-client";
import React from "react";
import { Suspense } from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useGetMarketDataQuery } from "@/lib/api";
import MarketDataInfo from "../UI-components/MarketDataInfo";
import NotificationCard from "../UI-components/NotificationCard";
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
      <Suspense fallback={<NotificationCard text="Loading data" />}>
        {isSuccess && (
          <div>
            <NotificationCard text="Data loaded" />
            <MarketDataInfo
              data={data}
              currency={currency}
              currencySymbol={currencySymbol}
            />
          </div>
        )}
      </Suspense>
    </>
  );
};

export default MarketData;
