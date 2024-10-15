"use-client";
import React, { useState, useEffect, useRef, useMemo } from "react";
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
import {
  formatLabelDate,
  formatMarketCap,
  getDisplayFormats,
  formatTimestampToDate,
} from "@/app/utils/formatHelpers";
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

const BarChart = ({
  params,
  currency,
  days,
}: {
  params: { id: string };
  currency: Currency;
  days: number | string;
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
  const [displayVolume, setDisplayVolume] = useState<number>(0);

  const chartRef = useRef<Chart | null>(null);

  const { labels, volumes } = useMemo(() => {
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
 
  const options: ChartOptions<"bar"> = useMemo(() => ({
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
        backgroundColor: "rgba(0, 0, 0, 0)",
        caretSize: 5,
        caretPadding: 1,
      },
    },
    interaction: {
      mode: "index",
    },
    onHover: (_, chartElements) => {
      if (chartElements.length > 0 && volumes && volumes.length > 0) {
        const chartIndex = chartElements[0].index;
        const currentLabel = labels[chartIndex];
        const currentVolume = volumes[chartIndex];
        const formattedDate = formatTimestampToDate(currentLabel);
        setDisplayDate(formattedDate);
        setDisplayVolume(Math.floor(formatMarketCap(currentVolume)));
      }
    },
    scales: {
      x: {
        type: "time",
        offset: true,
        ...getDisplayFormats(days),
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
        beginAtZero: true,
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  }), [days, volumes, labels]);

  const chartData: any = useMemo(() => {
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
            gradient.addColorStop(1, "rgba(157, 98, 217, 1)");
            return gradient;
          },
          barPercentage: 0.5,
          barThickness: 1,
          maxBarThickness: 3,
          borderRadius: 10,
        },
      ],
    };
  }, [labels, volumes]);

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
  }, [chartData,options]);

  return (
    <div className="flex flex-col justify-start dark:bg-dark-darkBg bg-light-primary p-6">
      <div>
        <div className="flex flex-col justify-start gap-6">
          <p className="text-light-darkText dark:text-dark-chartTextColor text-xl leading-6">
            Volume 24h
          </p>
          {volumes && volumes.length > 0 && (
            <p className="text-2.5xl font-bold">
              {currencySymbol}
              {Math.floor(displayVolume || volumes[1])}
            </p>
          )}
        </div>
        <p className="text-base font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor">
          {displayDate}
        </p>
      </div>
      <div>
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
};

export default BarChart;
