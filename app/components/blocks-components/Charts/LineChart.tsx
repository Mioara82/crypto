"use-client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LogarithmicScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import CrosshairPlugin from "chartjs-plugin-crosshair";
import { Line } from "react-chartjs-2";
import {
  formatLabelDate,
  handleCoinDateDisplay,
} from "@/app/utils/formatHelpers";
import { createChartOptions } from "@/app/utils/ChartUtils/chartOptions";
import { createLineChartData } from "@/app/utils/ChartUtils/chartData";
import { useGetChartDataQuery } from "@/lib/api";
import { useChart } from "@/lib/hooks/useChart";
import { useAppSelector } from "@/lib/hooks/hooks";
import NotificationCard from "../../UI-components/NotificationCard";
import { RootState } from "@/lib/store";
import { Currency } from "@/lib/features/currencySlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
  CrosshairPlugin,
);

const LineChart = ({
  coinOne,
  coinTwo,
  coinOneName,
  coinTwoName,
  currency,
  days,
  chartType,
  isLinear,
  isLogarithmic,
}: {
  coinOne: any;
  coinTwo: any | null;
  coinOneName: string;
  coinTwoName: string;
  currency: Currency;
  days: number;
  chartType: "linear" | "logarithmic";
  isLinear: any;
  isLogarithmic: any;
}) => {
  const defaultCoinOne = { id: "bitcoin", symbol: "btc", currentPrice: 45000 };

  const { data: coinOneData, isError: isErrorOne } = useGetChartDataQuery({
    id: coinOne?.id || defaultCoinOne.id,
    currency,
    days,
  });

  const { data: coinTwoData, isError: isErrorTwo } = useGetChartDataQuery({
    id: coinTwo?.id,
    currency,
    days,
  });

  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol,
  );

  const today = formatLabelDate();
  const [displayDate, setDisplayDate] = useState<string>(today);
  const [displayPriceOne, setDisplayPriceOne] = useState<number>(0);
  const [displayPriceTwo, setDisplayPriceTwo] = useState<number>(0);

  useEffect(() => {
    setDisplayPriceOne(coinOne.currentPrice);
  }, [coinOne]);

  const labels =
    coinOneData?.prices?.map((price: any) =>
      handleCoinDateDisplay(price[0], days),
    ) || [];

  const timestamps = coinOneData?.prices?.map((price: any) => price[0] || []);

  const coinOnePrices =
    coinOneData?.prices?.map((price: any) => price[1]) || [];
  const coinTwoPrices =
    coinTwoData?.prices?.map((price: any) => price[1]) || [];

  const options = useMemo(
    () =>
      createChartOptions(
        coinOnePrices,
        coinTwoPrices,
        coinOneName,
        coinTwoName,
        timestamps,
        currencySymbol,
        days,
        setDisplayDate,
        setDisplayPriceOne,
        setDisplayPriceTwo,
        chartType,
      ),
    [
      coinOnePrices,
      coinTwoPrices,
      coinOneName,
      coinTwoName,
      timestamps,
      currencySymbol,
      setDisplayDate,
      setDisplayPriceOne,
      setDisplayPriceTwo,
      chartType,
    ],
  );

  const chartData = useMemo(
    () =>
      createLineChartData(
        labels,
        timestamps,
        coinOne,
        coinOnePrices,
        coinTwo,
        coinTwoPrices,
      ),
    [labels, timestamps, coinOne, coinOnePrices, coinTwo, coinTwoPrices],
  );

  useChart(options, chartData);

  return (
    <>
      {isLinear && (
        <>
          {isErrorOne && (
            <NotificationCard text="Error loading data" isSuccess={false} />
          )}
          <div className="flex flex-col justify-start bg-light-primary p-6 dark:bg-dark-darkBg">
            <div>
              <div className="flex flex-col justify-start gap-6">
                <p className="text-xl leading-6 text-light-darkText dark:text-dark-chartTextColor">
                  {coinOneName} {coinOne.symbol}
                </p>
                <p className="text-2.5xl font-bold">
                  {currencySymbol}
                  {displayPriceOne.toFixed(2) || coinOne.currentPrice}
                </p>
              </div>
              <p className="text-base font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor">
                {displayDate || today}
              </p>
            </div>
            <div>
              <Line options={options} data={chartData} />
            </div>
          </div>
        </>
      )}
      {isLogarithmic && (
        <>
          {(isErrorOne || isErrorTwo) && (
            <NotificationCard text="Error loading data" isSuccess={false} />
          )}
          <div className="flex h-full flex-col justify-start bg-light-primary p-6 dark:bg-dark-darkBg">
            <div className="h-14">
              <p className="text-xl font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor">
                {displayDate || today}
              </p>
            </div>
            <div>
              <Line options={options} data={chartData} />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-common-linearGradient"></div>
                <div>{coinOneName}</div>
                <div>
                  {currencySymbol}{" "}
                  {(displayPriceOne || coinOne.currentPrice).toFixed(2)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-common-chart-graph-100"></div>
                <div>{coinTwoName}</div>
                <div>
                  {currencySymbol}{" "}
                  {(displayPriceTwo || coinTwo.currentPrice).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LineChart;
