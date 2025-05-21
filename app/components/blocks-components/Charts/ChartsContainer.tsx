"use client";
import { lazy } from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import type { RootState } from "@/lib/store";
import type { Currency } from "@/lib/features/currencySlice";
import type { ChartCoinData } from "@/lib/features/coinSlice";

const Chart = lazy(() => import("./Chart"));

const ChartsContainer = ({
  currency,
  days,
}: {
  currency: Currency;
  days: number;
}) => {
  const {chartCoins} = useAppSelector(
    (state: RootState) => state.chartCoins,
  );
  const chartCoinKeys = Object.keys(chartCoins);
  const chartCoinsValues = Object.values(chartCoins);
  const [coinOneName, coinTwoName] = chartCoinKeys;
  const [coinOne, coinTwo] = chartCoinsValues;
  const data = (chartCoinsValues as ChartCoinData[]).map((coin) => coin.currentPrice);
  const isLogScale =
    data.length > 1 && Math.max(...data) / Math.min(...data) > 10;

  const chartType = isLogScale ? "logarithmic" : "linear";
  const isLinear = !!coinOne && !coinTwo;
  const isLogarithmic = !!coinOne && coinTwo;

  return (
    <>
      <div className="block h-auto justify-center gap-5 md:flex px-10">
        <Chart
          chartType={chartType}
          currency={currency}
          days={days}
          coinOne={coinOne}
          coinOneName={coinOneName}
          coinTwo={isLogarithmic ? coinTwo : null}
          coinTwoName={isLogarithmic ? coinTwoName : "n/a"}
          isLinear={isLinear}
          isLogarithmic={isLogarithmic}
        />
      </div>
    </>
  );
};

export default ChartsContainer;
