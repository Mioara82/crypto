"use-client";
import { useGetChartDataQuery } from "@/lib/api";
import React from "react";
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
  ChartOptions,
  ChartData,
  ScriptableContext,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import { formatLabelDate } from "@/app/utils/formatHelpers";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { CoinProps } from "../UI-components/CoinDetailsCarousel";
import { Currency } from "@/lib/features/appSettingsSlice";

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

const options: ChartOptions<"line"> = {
  responsive: true,
  layout: {
    padding: 20,
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: true,
      usePointStyle: true,
    },
  },
  interaction: {
    mode: "index",
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
        tooltipFormat: "P",
        displayFormats: {
          day: "MMM dd",
        },
      },
      grid: {
        display: false,
        color: "rgba(0,0,0,0)",
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
};

const LineChart = ({
  params,
  coin,
  currency,
}: {
  params: { id: string };
  coin: CoinProps;
  currency: Currency;
}) => {
  
  const { data, isSuccess } = useGetChartDataQuery({ id: params.id, currency });
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );

  let labels: number[] = [];
  let prices: number[] = [];

  if (isSuccess && data) {
    const result = data?.prices.reduce(
      (acc: { labels: number[]; prices: number[] }, [label, price]) => ({
        labels: [...acc.labels, label],
        prices: [...acc.prices, price],
      }),
      { labels: [], prices: [] }
    );

    labels = result.labels;
    prices = result.prices;
  }

  const chartData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        fill: true,
        data: prices,
        borderColor: "#7878FA",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return undefined;
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );

          gradient.addColorStop(0, "rgba(116, 116, 242, 0.01)");
          gradient.addColorStop(1, "rgba(116, 116, 242, 0.6)");
          return gradient;
        },
        pointRadius: 0,
        pointHoverRadius: 0,
        borderCapStyle:"round",
        borderJoinStyle:"round"
      },
    ],
  };
  return (
    <div className="flex flex-col justify-start dark:bg-dark-darkBg bg-light-primary p-6">
      <div>
        <div className="flex flex-col justify-start gap-6">
          <p className="text-light-darkText dark:text-dark-chartTextColor text-xl leading-6">
            {coin.name} ({coin.symbol.toUpperCase()})
          </p>
          <p className="text-2.5xl font-bold">
            {currencySymbol}
            {coin.current_price}
          </p>
        </div>
        <p className="text-base font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor">
          {formatLabelDate()}
        </p>
      </div>
      <div>
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default LineChart;
