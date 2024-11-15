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

export interface Coin {
  id: string;
  name:string;
  symbol: string;
  currentPrice: number;
}

function isCoin(coin: any): coin is Coin {
  return (
    coin &&
    typeof coin.id === "string" &&
    typeof coin.name === "string" &&
    typeof coin.symbol === "string" &&
    typeof coin.currentPrice === "number" &&
    coin.id !== "" &&
    coin.symbol !== "" &&
    coin.currentPrice > 0
  );
}

const ChartsWrapper = ({
  currency,
  days,
}: {
  currency: Currency;
  days: number;
}) => {
  const { chartCoins } = useAppSelector((state: RootState) => state.chartCoins);

  const chartCoinsValues = Object.values(chartCoins);
  const [coinOne, coinTwo]= chartCoinsValues;
  const defaultCoin = { id: "bitcoin", symbol: "btc", currentPrice: 45000 };
  const validCoinOne = coinOne && isCoin(coinOne) && Object.keys(coinOne).length > 0 ? coinOne : defaultCoin;
  const validCoinTwo = coinTwo && isCoin(coinTwo) && Object.keys(coinTwo).length > 0 ? coinTwo : defaultCoin;

  const numberOfCoins = chartCoinsValues.length;
  const chartType = numberOfCoins === 1 ? "line" : "logarithmic";

  return (
    <>
      {numberOfCoins === 1 && (
        <div className="flex justify-center w-maxWidth gap-10 p-4">
          <SuspenseChart type="line">
            <ChartWrapper>
              <LineChart
                paramsOne={{ id: validCoinOne.id}}
                paramsTwo={{id:""}}
                coinOne={coinOne || defaultCoin}
                coinTwo={null}
                currency={currency}
                days={days}
                chartType={chartType}
              />
            </ChartWrapper>
          </SuspenseChart>
          <SuspenseChart type="bar">
            <ChartWrapper>
              <BarChart
                params={{ id: defaultCoin.id }}
                currency={currency}
                days={days}
              />
            </ChartWrapper>
          </SuspenseChart>
        </div>
      )}
      {numberOfCoins === 2 && (
        <div className="flex justify-center w-maxWidth gap-10 p-4">
          <SuspenseChart type="line">
            <ChartWrapper>
              <LineChart
                paramsOne={{ id: validCoinOne.id }}
                paramsTwo={{id:validCoinTwo.id}}
                coinOne={coinOne}
                coinTwo={coinTwo}
                currency={currency}
                days={days}
                chartType={chartType}
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
