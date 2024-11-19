"use-client";
import React, { useState,useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
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
import { Line } from "react-chartjs-2";
import {
  formatMarketCap,
  formatLabelDate,
  formatTimestampToDate,
  handleCoinDateDisplay
} from "@/app/utils/formatHelpers";
import { createChartOptions } from "@/app/utils/ChartUtils/chartOptions";
import { createLineChartData } from "@/app/utils/ChartUtils/chartData";
import { useGetChartDataQuery } from "@/lib/api";
import { useChart } from "@/lib/hooks/useChart";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { Currency } from "@/lib/features/currencySlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale
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

  const { data: coinOneData} = useGetChartDataQuery({
    id: coinOne?.id || defaultCoinOne.id,
    currency,
    days,
  });

  const { data: coinTwoData} = useGetChartDataQuery({
    id: coinTwo?.id,
    currency,
    days,
  });

  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );

  const today = formatLabelDate();
  const [displayDate, setDisplayDate] = useState<string>(today);
  const [displayPrice, setDisplayPrice] = useState<number>(0);

  const labels = coinOneData?.prices?.map((price: any) => handleCoinDateDisplay(price[0], days)) || [];

  const coinOnePrices = coinOneData?.prices?.map((price: any) => price[1]) || [];
  const coinTwoPrices = coinTwoData?.prices?.map((price: any) => price[1]) || [];

  const allPrices = [...coinOnePrices, ...coinTwoPrices];

  const options = useMemo(
    () =>
      createChartOptions(
        allPrices,
        labels,
        currencySymbol,
        formatTimestampToDate,
        formatMarketCap,
        setDisplayDate,
        setDisplayPrice,
        chartType
      ),
    [
      allPrices,
      labels,
      currencySymbol,
      setDisplayDate,
      setDisplayPrice,
      chartType,
    ]
  );

  const chartData = useMemo(
    () =>
      createLineChartData(
        labels,
        coinOne,
        coinOnePrices,
        coinTwo,
        coinTwoPrices
      ),
    [labels, coinOne, coinOnePrices, coinTwo, coinTwoPrices]
  );

  useChart("lineChart", options, chartData);

  return (
    <>
      {isLinear && (
        <div className="flex flex-col justify-start dark:bg-dark-darkBg bg-light-primary p-6">
          <div>
            <div className="flex flex-col justify-start gap-6">
              <p className="text-light-darkText dark:text-dark-chartTextColor text-xl leading-6">
                {coinOneName} {coinOne.symbol}
              </p>
              <p className="text-2.5xl font-bold">
                {currencySymbol}
                {displayPrice || coinOne.current_price}
              </p>
            </div>
            <p className="text-base font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor">
              {displayDate ||today}
            </p>
          </div>
          <div>
            <Line options={options} data={chartData} />
          </div>
        </div>
      )}
      {isLogarithmic && (
        <div className="flex flex-col justify-start dark:bg-dark-darkBg bg-light-primary p-6">
          <p className="text-xl font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor">
            {displayDate || today}
          </p>
          <div>
            <Line options={options} data={chartData} />
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-common-linearGradient"></div>
            <div>{coinOneName}</div>
            <div>
              {currencySymbol} {coinOne.currentPrice}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-common-chart-graph-100"></div>
            <div>{coinTwoName}</div>
            <div>
              {currencySymbol} {coinTwo.currentPrice}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LineChart;
