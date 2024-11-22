"use-client";
import React, { useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGetChartDataQuery } from "@/lib/api";
import { useChart } from "@/lib/hooks/useChart";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import {
  formatLabelDate,
  formatMarketCap,
  handleCoinDateDisplay,
} from "@/app/utils/formatHelpers";
import { createBarChartOptions } from "@/app/utils/ChartUtils/chartOptions";
import { createBarChartData } from "@/app/utils/ChartUtils/chartData";
import { Currency } from "@/lib/features/currencySlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Filler,
  Legend
);

const BarChart = ({
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

  const { data: coinOneData } = useGetChartDataQuery({
    id: coinOne?.id || defaultCoinOne.id,
    currency,
    days,
  });

  const { data: coinTwoData } = useGetChartDataQuery({
    id: coinTwo?.id,
    currency,
    days,
  });

  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );
  const today = formatLabelDate();
  const [displayDate, setDisplayDate] = useState<string>(today);
  const [displayVolumeOne, setDisplayVolumeOne] = useState<number>(0);
  const [displayVolumeTwo, setDisplayVolumeTwo] = useState<number>(0);

  const labels =
    coinOneData?.totalVolumes?.map((volume: any) =>
      handleCoinDateDisplay(new Date(volume[0]), days)
    ) || [];

  const timestamps =
    coinOneData?.totalVolumes?.map((volume: any) => volume[0]) || [];

  const coinOneVolumes =
    coinOneData?.totalVolumes?.map((volume: any) => volume[1]) || [];
  const coinTwoVolumes =
    coinTwoData?.totalVolumes?.map((volume: any) => volume[1]) || [];

  const options = useMemo(
    () =>
      createBarChartOptions(
        coinOneVolumes,
        coinTwoVolumes,
        coinOneName,
        coinTwoName,
        timestamps,
        currencySymbol,
        setDisplayDate,
        setDisplayVolumeOne,
        setDisplayVolumeTwo,
        days,
        chartType
      ),
    [
      coinOneVolumes,
      coinTwoVolumes,
      coinOneName,
      coinTwoName,
      timestamps,
      currencySymbol,
      days,
      setDisplayDate,
      setDisplayVolumeOne,
      setDisplayVolumeTwo,
      chartType,
    ]
  );

  const chartData = useMemo(
    () =>
      createBarChartData(
        labels,
        coinOne,
        coinOneVolumes,
        coinTwo,
        coinTwoVolumes
      ),
    [labels, coinOne, coinOneVolumes, coinTwo, coinTwoVolumes]
  );

  useChart(options, chartData);

  return (
    <>
      {isLinear && (
        <div className="flex flex-col justify-start dark:bg-dark-darkBg bg-light-primary p-6">
          <div>
            <div className="flex flex-col justify-start gap-6">
              <p className="text-light-darkText dark:text-dark-chartTextColor text-xl leading-6">
                Volume 24h
              </p>
              {coinOneVolumes && coinOneVolumes.length > 0 && (
                <p className="text-2.5xl font-bold">
                  {currencySymbol}
                  {formatMarketCap(displayVolumeOne || coinOneVolumes[1])}
                </p>
              )}
            </div>
            <p className="text-base font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor">
              {displayDate || today}
            </p>
          </div>
          <div>
            <Bar options={options} data={chartData} />
          </div>
        </div>
      )}
      {isLogarithmic && (
        <div className="flex flex-col justify-start dark:bg-dark-darkBg bg-light-primary p-6">
          <h2>Volume 24h</h2>
          <p className="text-xl font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor">
            {displayDate || today}
          </p>
          <div>
            <Bar options={options} data={chartData} />
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-common-linearGradient"></div>
              <div>{coinOneName}</div>
              <div>
                {currencySymbol}{" "}
                {formatMarketCap(displayVolumeOne || coinOneVolumes[0])}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-common-chart-graph-100"></div>
              <div>{coinTwoName}</div>
              <div>
                {currencySymbol}{" "}
                {formatMarketCap(displayVolumeTwo || coinTwoVolumes[0])}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BarChart;
