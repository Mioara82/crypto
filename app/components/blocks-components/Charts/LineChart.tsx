"use-client";
import React, { useState, useEffect, useRef, useMemo } from "react";
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
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {
  formatMarketCap,
  formatLabelDate,
  getDisplayFormats,
  formatTimestampToDate,
} from "@/app/utils/formatHelpers";
import { useGetChartDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { CoinProps } from "../../UI-components/CoinDetailsCarousel";
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

const LineChart = ({
  params,
  coin,
  currency,
  days,
}: {
  params: { id: string };
  coin: CoinProps;
  currency: Currency;
  days: string | number;
}) => {
  const { data, isSuccess } = useGetChartDataQuery({
    id: params.id,
    currency,
    days,
  });
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );

  const today = formatLabelDate();
  const [displayDate, setDisplayDate] = useState<string>(today);
  const [displayPrice, setDisplayPrice] = useState<number>(0);

  const chartRef = useRef<Chart | null>(null);

  const { labels, prices } = useMemo(() => {
    if (isSuccess && data) {
      const result = data?.prices.reduce(
        (acc: { labels: number[]; prices: number[] }, [label, price]) => ({
          labels: [...acc.labels, label],
          prices: [...acc.prices, price],
        }),
        { labels: [], prices: [] }
      );

      return {
        labels: result.labels,
        prices: result.prices,
      };
    }
    return { labels: [], prices: [] };
  }, [isSuccess, data]);

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
        backgroundColor: "rgba(0, 0, 0, 0)",
        caretSize: 5,
        caretPadding: 1,
        callbacks: {
          label: (tooltipItems: any) => {
            const { index } = tooltipItems.dataIndex;
            const price = prices[index];
            return `Price: ${currencySymbol}${price}`;
          },
        },
      },
    },
    interaction: {
      mode: "index",
    },
    onHover: (_, chartElements) => {
      if (chartElements.length > 0 && prices && prices.length > 0) {
        const chartIndex = chartElements[0].index;
        const currentLabel = labels[chartIndex];
        const currentPrice = prices[chartIndex];
        const formattedDate = formatTimestampToDate(currentLabel);
        setDisplayDate(formattedDate);
        setDisplayPrice(Math.floor(formatMarketCap(currentPrice)));
      }
    },
    scales: {
      x: {
        type: "time",
        time: {
          ...getDisplayFormats(days),
          tooltipFormat: "P",
        },
        grid: {
          display: false,
          color: "rgba(0,0,0,0)",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          callback: (value) => {
            const date = new Date(value);
            return `${date.toLocaleString("default", {
              month: "short",
            })} ${date.getDate()}`;
          },
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

  const chartData: ChartData<"line"> = useMemo(() => {
    return {
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
          borderCapStyle: "round",
          borderJoinStyle: "round",
        },
      ],
    };
  }, [labels, prices]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const canvas = document.getElementById(
      "barChart"
    ) as HTMLCanvasElement | null;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        chartRef.current = new Chart(ctx, {
          type: "line",
          data: chartData,
          options: options,
        });
      }
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [chartData,options]);

  return (
    <div className="flex flex-col justify-start dark:bg-dark-darkBg bg-light-primary p-6">
      <div>
        <div className="flex flex-col justify-start gap-6">
          <p className="text-light-darkText dark:text-dark-chartTextColor text-xl leading-6">
            {coin.name} ({coin.symbol.toUpperCase()})
          </p>
          <p className="text-2.5xl font-bold">
            {currencySymbol}
            {displayPrice || coin.current_price}
          </p>
        </div>
        <p className="text-base font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor">
          {displayDate}
        </p>
      </div>
      <div>
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default LineChart;
