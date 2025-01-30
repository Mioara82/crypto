"use-client";
import React, { useState, useMemo } from "react";
import CrosshairPlugin from "chartjs-plugin-crosshair";
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
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { RootState } from "@/lib/store";
import {
  formatLabelDate,
  formatMarketCap,
  handleCoinDateDisplay,
  calculateNumberOfBars,
} from "@/app/utils/formatHelpers";
import { createBarChartOptions } from "@/app/utils/ChartUtils/chartOptions";
import { createBarChartData } from "@/app/utils/ChartUtils/chartData";
import { Currency } from "@/lib/features/currencySlice";
import { DisplayProps } from "./Chart";
import ButtonWrapper from "./ButtonWrapper";
import NotificationCard from "../../UI-components/NotificationCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Filler,
  Legend,
  CrosshairPlugin,
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
  const [displayVolumeOne, setDisplayVolumeOne] = useState<number>(0);
  const [displayVolumeTwo, setDisplayVolumeTwo] = useState<number>(0);

  const numberOfBars = calculateNumberOfBars(days);

  const labels =
    coinOneData?.totalVolumes
      ?.map((volume: any) => handleCoinDateDisplay(new Date(volume[0]), days))
      .slice(0, numberOfBars) || [];

  const timestamps =
    coinOneData?.totalVolumes
      ?.map((volume: any) => volume[0])
      .slice(0, numberOfBars) || [];

  const coinOneVolumes =
    coinOneData?.totalVolumes
      ?.map((volume: any) => volume[1])
      .slice(0, numberOfBars) || [];
  const coinTwoVolumes =
    coinTwoData?.totalVolumes
      ?.map((volume: any) => volume[1])
      .slice(0, numberOfBars) || [];

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
        chartType,
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
    ],
  );

  const chartData = useMemo(
    () =>
      createBarChartData(
        labels,
        coinOne,
        coinOneVolumes,
        coinTwo,
        coinTwoVolumes,
      ),
    [labels, coinOne, coinOneVolumes, coinTwo, coinTwoVolumes],
  );

  useChart(options, chartData);

  return (
    <>
      {isLinear && (
        <>
          {isErrorOne && (
            <NotificationCard text="Error loading data" isSuccess={false} />
          )}
          <div className="flex flex-col justify-start rounded-md bg-light-primary p-6 dark:bg-dark-darkBg">
            <div>
              <div className="flex flex-col justify-start gap-6">
                <p className="text-xs leading-6 text-light-darkText dark:text-dark-chartTextColor md:text-base 2xl:text-xl">
                  Volume 24h
                </p>
                {coinOneVolumes && coinOneVolumes.length > 0 && (
                  <p className="hidden font-bold sm:text-sm md:text-base 2xl:text-2.5xl">
                    {currencySymbol}
                    {formatMarketCap(displayVolumeOne || coinOneVolumes[1])}
                  </p>
                )}
              </div>
              <p className="hidden font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor sm:text-xs md:text-base">
                {displayDate || today}
              </p>
            </div>
            <div>
              <div className="h-56 sm:h-64 md:h-72 lg:h-96">
                <Bar options={options} data={chartData} />
              </div>
              {isMobile && showChart.next && (
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
          <div className="flex flex-col justify-start rounded-md bg-light-primary p-6 dark:bg-dark-darkBg">
            <h2 className="text-sm font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor md:text-xl">
              Volume 24h
            </h2>
            <p className="text-base font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor md:text-xl">
              {displayDate || today}
            </p>
            <div className="h-56 sm:h-64 md:h-72 lg:h-96">
              <Bar options={options} data={chartData} />
            </div>
            {isMobile && showChart.next && (
              <ButtonWrapper
                handleChartDisplayOnMobile={handleChartDisplayOnMobile}
                showChart={showChart}
              />
            )}
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-common-linearGradient"></div>
                <div className="text-xs md:text-base">{coinOneName}</div>
                <div className="hidden lg:flex">
                  {currencySymbol}{" "}
                  {formatMarketCap(displayVolumeOne || coinOneVolumes[0])}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-common-chart-graph-100"></div>
                <div className="text-xs md:text-base">{coinTwoName}</div>
                <div className="hidden lg:flex">
                  {currencySymbol}{" "}
                  {formatMarketCap(displayVolumeTwo || coinTwoVolumes[0])}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BarChart;
