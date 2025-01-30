"use-client";
import React, { useState, useEffect, useMemo } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
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
  capitaliseString,
} from "@/app/utils/formatHelpers";
import { createChartOptions } from "@/app/utils/ChartUtils/chartOptions";
import { createLineChartData } from "@/app/utils/ChartUtils/chartData";
import { useGetChartDataQuery } from "@/lib/api";
import { useChart } from "@/lib/hooks/useChart";
import { useAppSelector } from "@/lib/hooks/hooks";
import NotificationCard from "../../UI-components/NotificationCard";
import ButtonWrapper from "./ButtonWrapper";
import { RootState } from "@/lib/store";
import { Currency } from "@/lib/features/currencySlice";
import { DisplayProps } from "./Chart";

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
  showChart,
  handleChartDisplayOnMobile,
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
  showChart: DisplayProps;
  handleChartDisplayOnMobile: () => void;
}) => {
  const isMobile = useIsMobile();
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
    if (!coinOne) return;
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
          <div className="relative flex flex-col justify-start rounded-md bg-light-primary p-6 dark:bg-dark-darkBg">
            <div>
              <div className="flex flex-col justify-start gap-6">
                <p className="text-base leading-6 text-light-darkText dark:text-dark-chartTextColor 2xl:text-xl">
                  {capitaliseString(coinOneName)} ({coinOne.symbol})
                </p>
                <p className="text-sm font-bold md:text-base 2xl:text-2.5xl">
                  {currencySymbol}
                  {displayPriceOne.toFixed(2) || coinOne.currentPrice}
                </p>
              </div>
              <p className="hidden font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor sm:text-xs md:text-base">
                {displayDate || today}
              </p>
            </div>

            <div>
              <div className="h-56 sm:h-64 md:h-72 lg:h-96">
                <Line options={options} data={chartData} />
              </div>
              {isMobile && showChart.prev && (
                <ButtonWrapper
                  handleChartDisplayOnMobile={handleChartDisplayOnMobile}
                  showChart={showChart}
                />
              )}
            </div>
          </div>
        </>
      )}
      {isLogarithmic && (
        <>
          {(isErrorOne || isErrorTwo) && (
            <NotificationCard text="Error loading data" isSuccess={false} />
          )}
          <div className="relative flex h-full flex-col justify-start rounded-md bg-light-primary p-6 dark:bg-dark-darkBg">
            <div className="h-14">
              <p className="text-sm font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor md:text-xl">
                {displayDate || today}
              </p>
            </div>
            <div className="h-56 sm:h-64 md:h-72 lg:h-96">
              <Line options={options} data={chartData} />
            </div>
            {isMobile && showChart.prev && (
              <ButtonWrapper
                handleChartDisplayOnMobile={handleChartDisplayOnMobile}
                showChart={showChart}
              />
            )}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center md:flex-row md:gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-common-linearGradient md:h-4 md:w-4"></div>
                  <div className="text-xs md:text-base">{coinOneName}</div>
                </div>
                <div className="hidden lg:flex">
                  <span className="text-xs md:text-base">
                    {currencySymbol}{" "}
                  </span>
                  <span className="text-xs md:text-base">
                    {(displayPriceOne || coinOne.currentPrice).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center md:flex-row md:gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-common-chart-graph-100 md:h-4 md:w-4"></div>
                  <div className="text-xs md:text-base">{coinTwoName}</div>
                </div>
                <div className="hidden lg:flex">
                  <span className="text-xs md:text-base">
                    {currencySymbol}{" "}
                  </span>
                  <span className="text-xs md:text-base">
                    {(displayPriceTwo || coinTwo.currentPrice).toFixed(2)}
                  </span>
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
