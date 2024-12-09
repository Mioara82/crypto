/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
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
import { capitaliseString } from "@/app/utils/formatHelpers";
import { useGetChartDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useChart } from "@/lib/hooks/useChart";
import { createConverterChartOptions } from "@/app/utils/ChartUtils/chartOptions";
import { ConverterChartData } from "@/app/utils/ChartUtils/chartData";
import { RootState } from "@/lib/store";
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
const ConverterChart = () => {
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName
  );
  const coinOne = useAppSelector((state: RootState) => state.converter.coinOne);
  const coinTwo = useAppSelector((state: RootState) => state.converter.coinTwo);
  const selectedFilter = useAppSelector(
    (state: RootState) => state.converter.selectedFilter
  );
  const days = selectedFilter.period;
  const { data: dataOne } = useGetChartDataQuery({
    id: coinOne.id,
    currency,
    days,
  });
  const { data: dataTwo } = useGetChartDataQuery({
    id: coinTwo.id,
    currency,
    days,
  });

  const [displayRate, setDisplayRate] = useState<number>(0);

  const { labels, conversionRates } = useMemo(() => {
    if (dataOne && dataTwo) {
      const pricesOne = dataOne.prices;
      const pricesTwo = dataTwo.prices;
      const rates = pricesOne.map(([_, priceOne], index) => {
        const priceTwo = pricesTwo[index]?.[1] ?? 1;
        return priceOne / priceTwo;
      });

      const timestamps = pricesOne.map(([timestamp]) => timestamp);

      return { labels: timestamps, conversionRates: rates };
    }
    return { labels: [], conversionRates: [] };
  }, [dataOne, dataTwo]);

  const options = useMemo(
    () =>
      createConverterChartOptions(
        conversionRates,
        coinOne,
        coinTwo,
        setDisplayRate,
        days
      ),
    [conversionRates, coinOne, coinTwo, setDisplayRate, days]
  );

  const chartData = useMemo(
    () => ConverterChartData(labels, conversionRates),
    [labels, conversionRates]
  );

  useChart(options, chartData);

  return (
    <div className=" dark:bg-dark-darkBg bg-light-primary p-6">
      <div>
        <div className="flex gap-3">
          <p className="flex gap-2">
            {coinOne.name}
            <span>({capitaliseString(coinOne.symbol)})</span>
          </p>
          <p>to</p>
          <p className="flex gap-3">
            {coinTwo.name}
            <span>({capitaliseString(coinTwo.symbol)})</span>
          </p>
        </div>
        <div>Conversion rate: {displayRate.toFixed(2)}</div>
      </div>
      <div className="h-96 w-full flex-grow">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default ConverterChart;