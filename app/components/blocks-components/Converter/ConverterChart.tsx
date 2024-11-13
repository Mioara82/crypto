import React, { useRef, useMemo, useEffect } from "react";
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
import { getDisplayFormats, capitaliseString } from "@/app/utils/formatHelpers";
import { useGetChartDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
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

  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );
  const chartRef = useRef<Chart | null>(null);

  const { labels, conversionRates } = useMemo(() => {
    if (dataOne && dataTwo) {
      const pricesOne = dataOne.prices;
      const pricesTwo = dataTwo.prices;

      const rates = pricesOne.map(([priceOne], index) => {
        const priceTwo = pricesTwo[index]?.[1] ?? 1;
        return priceOne / priceTwo;
      });

      const timestamps = pricesOne.map(([timestamp]) => timestamp);

      return { labels: timestamps, conversionRates: rates };
    }
    return { labels: [], conversionRates: [] };
  }, [dataOne, dataTwo]);

  const options: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio:false,
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
              const rate = conversionRates[index];
              return `Conversion Rate: ${currencySymbol}${rate.toFixed(6)}`;
            },
          },
        },
      },
      interaction: {
        mode: "index",
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
    }),
    [days, conversionRates, currencySymbol]
  );

  const chartData: ChartData<"line"> = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          fill: true,
          data: conversionRates,
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
  }, [labels, conversionRates]);

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
  }, [chartData, options]);

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
      </div>
      <div className="h-96 w-full flex-grow">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default ConverterChart;
