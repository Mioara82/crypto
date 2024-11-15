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
  getChartLabels,
} from "@/app/utils/formatHelpers";
import { useGetChartDataQuery } from "@/lib/api";
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
  paramsOne,
  paramsTwo,
  coinOne,
  coinTwo,
  currency,
  days,
  chartType,
}: {
paramsOne: { id: string };
paramsTwo:{id:string};
  coinOne:any;
  coinTwo: any;
  currency: Currency;
  days: number;
  chartType: string;
}) => {
  const { data: coinOneData } = useGetChartDataQuery({
    id: paramsOne.id,
    currency,
    days,
  });

  const { data: coinTwoData } = useGetChartDataQuery({
    id: paramsTwo.id,
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

  const labels =
    coinOneData?.prices?.map((item: any) => getChartLabels(days, item[0])) ||
    [];

  const coinOnePrices = coinOneData?.prices?.map((item: any) => item[1]) || [];
  const coinTwoPrices = coinTwoData?.prices?.map((item: any) => item[1]) || [];

  const allPrices = [...coinOnePrices, ...coinTwoPrices];

  const options: ChartOptions<"line"> = useMemo(
    () => ({
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
              const price = allPrices[index];
              return `Price: ${currencySymbol}${price}`;
            },
          },
        },
      },
      interaction: {
        mode: "index",
      },
      onHover: (_, chartElements) => {
        if (chartElements.length > 0 && allPrices && allPrices.length > 0) {
          const chartIndex = chartElements[0].index;
          const currentLabel = labels[chartIndex];
          const currentPrice = allPrices[chartIndex];
          const formattedDate = formatTimestampToDate(Number(currentLabel));
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
          type: chartType === "logarithmic" ? "logarithmic" : "linear",
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
    [days, allPrices, labels, currencySymbol]
  );

  const chartData = useMemo(() => {
    return {
      labels,
      datasets: [
        coinOne && {
          label: coinOne?.name || "Coin One",
          data: coinOnePrices,
          borderColor: "#7878FA",
          borderWidth: 3,
          borderRadius: 3,
          categoryPercentage: 0.75,
          backgroundColor: (context: ScriptableContext<"line">) => {
            const gradient = context.chart.ctx.createLinearGradient(
              0,
              0,
              0,
              400
            );
            gradient.addColorStop(0, "#7878FA");
            gradient.addColorStop(0.65, "rgba(120, 120, 250, 0)");
            return gradient;
          },
          pointRadius: 0,
          pointHoverRadius: 0,
          borderCapStyle: "round",
          borderJoinStyle: "round",
          fill: true,
        },
        coinTwo && {
          label: coinTwo?.name || "Coin Two",
          data: coinTwoPrices,
          borderColor: "#D878FA",
          borderWidth: 3,
          borderRadius: 3,
          categoryPercentage: 0.75,
          backgroundColor: (context: ScriptableContext<"line">) => {
            const gradient = context.chart.ctx.createLinearGradient(
              0,
              0,
              0,
              400
            );
            gradient.addColorStop(0, "#D878FA");
            gradient.addColorStop(0.65, "rgba(216, 120, 250, 0)");
            return gradient;
          },
          pointRadius: 0,
          pointHoverRadius: 0,
          borderCapStyle: "round",
          borderJoinStyle: "round",
          fill: true,
        },
      ].filter(Boolean),
    };
  }, [labels, coinOnePrices, coinTwoPrices,coinOne, coinTwo, chartType]);

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
    <>
      {chartType === "line" && (
        <div className="flex flex-col justify-start dark:bg-dark-darkBg bg-light-primary p-6">
          <div>
            <div className="flex flex-col justify-start gap-6">
              <p className="text-light-darkText dark:text-dark-chartTextColor text-xl leading-6">
                {coinOne.name} {coinOne.symbol}
              </p>
              <p className="text-2.5xl font-bold">
                {currencySymbol}
                {displayPrice || coinOne.current_price}
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
      )}
      {chartType === "logarithmic" && (
        <div className="flex flex-col justify-start dark:bg-dark-darkBg bg-light-primary p-6">
          <p className="text-xl font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor">
            {displayDate}
          </p>
          <div>
            <Line options={options} data={chartData} />
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-common-linearGradient"></div>
            <div>{coinOne.name}</div>
            <div>
              {currencySymbol} {coinOne.currentPrice}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-common-chart-graph-100"></div>
            <div>{coinTwo.name}</div>
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
