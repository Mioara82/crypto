import { ChartOptions } from "chart.js";
import { handleCoinDateDisplay } from "../formatHelpers";

export const createChartOptions = (
  allPrices: number[],
  labels: any,
  currencySymbol: string,
  formatTimestampToDate: any,
  formatMarketCap: any,
  setDisplayDate: any,
  setDisplayPrice: any,
  chartType: "linear" | "logarithmic"
): ChartOptions<"line"> => ({
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
      intersect: false,
      mode: "index",
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
      type: chartType,
      beginAtZero: false,
      min: 0.1,
      max: 1000,
      display: false,
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
});

export const createBarChartOptions = (
  allVolumes: number[],
  coinOneData: any,
  labels: any,
  currencySymbol: any,
  formatTimestampToDate: any,
  formatMarketCap: any,
  setDisplayDate: any,
  setDisplayVolume: any,
  days: number,
  chartType: "linear" | "logarithmic"
): ChartOptions<"bar"> => ({
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
      mode: "index",
      intersect: false,
      callbacks: {
        label: (tooltipItems: any) => {
          const { index } = tooltipItems.dataIndex;
          const price = allVolumes[index];
          return `Price: ${currencySymbol}${price}`;
        },
      },
    },
  },
  interaction: {
    mode: "index",
  },
  onHover: (_, chartElements) => {
    if (chartElements.length > 0 && allVolumes && allVolumes.length > 0) {
      const chartIndex = chartElements[0].index;
      const currentLabel = labels[chartIndex];
      const currentVolume = allVolumes[chartIndex];
      const formattedDate = formatTimestampToDate(Number(currentLabel));
      setDisplayDate(formattedDate);
      setDisplayVolume(Math.floor(formatMarketCap(currentVolume)));
    }
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: "rgba(0, 0, 0, 0)",
        lineWidth: 1,
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
      },
      beforeFit: (axis) => {
        const volumes = coinOneData?.totalVolumes || [];
        const length = volumes.length - 1;
        if (volumes && length >= 0) {
          axis.ticks.push({
            label: handleCoinDateDisplay(volumes[length][0], days),
            value: length,
          });
        }
      },
    },
    y: {
      type: chartType,
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
});
