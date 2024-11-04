"use client";
import { lazy } from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { Currency } from "@/lib/features/currencySlice";

import { SuspenseChart } from "./SuspenseChart";

const LineChart = lazy(() => import("./LineChart"));
const BarChart = lazy(() => import("./BarChart"));

interface ChartWrapperProps {
  children: React.ReactNode;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ children }) => (
  <div className="w-full p-6 rounded-xl relative">{children}</div>
);

const ChartsWrapper = ({
  currency,
  days,
}: {
  currency: Currency;
  days: string | number;
}) => {
  const { chartCoins } = useAppSelector((state: RootState) => state.chartCoins);
  const chartCoinsKeys = Object.keys(chartCoins);
  const numberOfCoins = chartCoinsKeys.length;
  const firstCoin =
    numberOfCoins > 0
      ? chartCoins[chartCoinsKeys[0]]
      : { id: "bitcoin", symbol: "btc", currentPrice: 45000 };

  return (
    <>
      {numberOfCoins > 0 ? (
        <div className="flex justify-center w-maxWidth gap-10 p-4">
          <SuspenseChart type="line">
            <ChartWrapper>
              <LineChart
                params={{ id: firstCoin.id }}
                coin={firstCoin}
                currency={currency}
                days={days}
              />
            </ChartWrapper>
          </SuspenseChart>
          <SuspenseChart type="bar">
            <ChartWrapper>
              <BarChart
                params={{ id: firstCoin.id }}
                currency={currency}
                days={days}
              />
            </ChartWrapper>
          </SuspenseChart>
        </div>
      ) : (
        //show default coin charts before user selection
        <div className="flex justify-center w-maxWidth gap-10 p-4">
          <SuspenseChart type="line">
            <ChartWrapper>
              <LineChart
                params={{ id: "bitcoin" }}
                coin={chartCoins}
                currency={currency}
                days={days}
              />
            </ChartWrapper>
          </SuspenseChart>
          <SuspenseChart type="bar">
            <ChartWrapper>
              <BarChart
                params={{ id: "bitcoin" }}
                currency={currency}
                days={days}
              />
            </ChartWrapper>
          </SuspenseChart>
        </div>
      )}
    </>
  );
};

export default ChartsWrapper;
