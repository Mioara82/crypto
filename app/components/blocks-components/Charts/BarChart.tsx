"use-client";
import React, { useEffect, useRef,useMemo } from "react";
import {
  Chart as ChartJS,
  ChartOptions,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ScriptableContext,
  TimeScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useGetChartDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { formatLabelDate, formatMarketCap } from "@/app/utils/formatHelpers";
import { Currency } from "@/lib/features/appSettingsSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options: ChartOptions<"bar"> = {
  responsive: true,
  layout: {
    padding: 20,
  },
  elements: {
    point: {
      pointStyle: "circle",
    },
    bar: {},
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
        display: true,
        color: "rgba(0, 0, 0, 0)",
        lineWidth: 1,
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

const BarChart = ({
  params,
  currency,
}: {
  params: { id: string };
  currency: Currency;
}) => {
  const { data, isSuccess } = useGetChartDataQuery({ id: params.id, currency });
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );
  const today = formatLabelDate();

  const chartRef = useRef<Chart | null>(null);

  const { labels, volumes} = useMemo(() => {
    if (isSuccess && data) {
      const result = data?.prices.reduce(
        (acc: { labels: number[]; volumes: number[] }, [label, volume]) => ({
          labels: [...acc.labels, label],
          volumes: [...acc.volumes, volume],
        }),
        { labels: [], volumes: [] }
      );
  
      return {
        labels: result.labels,
        volumes: result.volumes,
      };
    }
    return { labels: [], prices: [] };
  }, [isSuccess, data]);

  const chartData: any = useMemo(() =>{
    return {
      labels,
      datasets: [
        {
          data: volumes,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: (context: ScriptableContext<"bar">) => {
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
            gradient.addColorStop(0, "rgba(179,116,242,0.01)");
            gradient.addColorStop(1, "rgba(179,116,217,1)");
            return gradient;
          },
          categoryPercentage: 1,
          barPercentage: 0.5,
        },
      ],
    };
  },[labels, volumes]);
    
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
          type: "bar",
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
  }, [chartData]);

  return (
    <div className="flex flex-col justify-start dark:bg-dark-darkBg bg-light-primary p-6">
      <div>
        <div className="flex flex-col justify-start gap-6">
          <p className="text-light-darkText dark:text-dark-chartTextColor text-xl leading-6">
            Volume 24h
          </p>
          <p className="text-2.5xl font-bold">
            {currencySymbol}
            {formatMarketCap(volumes?.[1])}
          </p>
        </div>
        <p className="text-base font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor">
          {today}
        </p>
      </div>
      <div>
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
};

export default BarChart;
