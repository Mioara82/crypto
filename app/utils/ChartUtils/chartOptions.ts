/* eslint-disable prefer-const */
import { ChartOptions } from "chart.js";
import {
  handleCoinDateDisplay,
  formatMarketCap,
  formatTimestampToDate,
} from "../formatHelpers";

export const createChartOptions = (
  coinOnePrices: number[],
  coinTwoPrices: number[],
  coinOneName: string,
  coinTwoName: string,
  timestamps: any,
  currencySymbol: string,
  days: number,
  setDisplayDate: any,
  setDisplayPriceOne: any,
  setDisplayPriceTwo: any,
  chartType: "linear" | "logarithmic",
): ChartOptions<"line"> => {
  return {
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
        backgroundColor: "rgba(0, 50, 0, 0)",
        caretSize: 5,
        caretPadding: 1,
        mode: "index",
        intersect: false,
        padding: 8,
        callbacks: {
          label: (tooltipItems: any) => {
            const { datasetIndex, dataIndex } = tooltipItems;
            let price, name;
            const currentLabel = timestamps[dataIndex];
            const formattedDate = formatTimestampToDate(Number(currentLabel));
            if (datasetIndex === 0) {
              price = coinOnePrices[dataIndex];
              name = coinOneName;
              setDisplayPriceOne(price);
            } else if (datasetIndex === 1 && coinTwoPrices && coinTwoName) {
              price = coinTwoPrices[dataIndex];
              name = coinTwoName;
              setDisplayPriceTwo(price);
            }
            setDisplayDate(formattedDate);
            return `${name}: ${currencySymbol}${price?.toFixed(2)}`;
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
          unit: days === 1 ? "hour" : days <= 90 ? "day" : "month",
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
            return handleCoinDateDisplay(date, days);
          },
        },
      },
      y: {
        type: chartType,
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    // eslint-disable-next-line semi
  };
};

export const createBarChartOptions = (
  coinOneVolumes: number[],
  coinTwoVolumes: number[],
  coinOneName: string,
  coinTwoName: string,
  timestamps: any,
  currencySymbol: any,
  setDisplayDate: any,
  setDisplayVolumeOne: any,
  setDisplayVolumeTwo: any,
  days: number,
  chartType: "linear" | "logarithmic",
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
      usePointStyle: true,
      backgroundColor: "rgba(0, 50, 0, 0)",
      caretSize: 5,
      caretPadding: 1,
      mode: "index",
      intersect: false,
      padding: 8,
      callbacks: {
        label: (tooltipItems: any) => {
          const { datasetIndex, dataIndex } = tooltipItems;
          let volume, name;
          const currentLabel = timestamps[dataIndex];
          const formattedDate = formatTimestampToDate(Number(currentLabel));
          if (datasetIndex === 0) {
            volume = formatMarketCap(coinOneVolumes[dataIndex]);
            name = coinOneName;
            setDisplayVolumeOne(volume);
          } else if (datasetIndex === 1 && coinTwoVolumes && coinTwoName) {
            volume = formatMarketCap(coinTwoVolumes[dataIndex]);
            name = coinTwoName;
            setDisplayVolumeTwo(volume);
          }
          setDisplayDate(formattedDate);
          return `${name}: ${currencySymbol}${volume}`;
        },
        title: (tooltipItems) => tooltipItems[0].label,
      },
    },
  },
  interaction: {
    mode: "index",
  },
  scales: {
    x: {
      type: "category",
      offset: true,
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
        const volumes = coinOneVolumes || [];
        const length = volumes.length - 1;
        if (volumes && length >= 0) {
          axis.ticks.push({
            label: handleCoinDateDisplay(volumes[length], days),
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

export const createConverterChartOptions = (
  conversionRates: any,
  coinOne: any,
  coinTwo: any,
  setDisplayRate: any,
  days: number,
): ChartOptions<"line"> => {
  return {
    responsive: true,
    maintainAspectRatio: false,
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
        backgroundColor: "rgba(0, 50, 0, 0)",
        caretSize: 5,
        caretPadding: 1,
        mode: "index",
        intersect: false,
        padding: 8,
        callbacks: {
          label: (tooltipItems: any) => {
            const { dataIndex } = tooltipItems;
            // eslint-disable-line prefer-const
            let rate, nameOne, nameTwo;
            rate = conversionRates[dataIndex];
            nameOne = coinOne.name;
            nameTwo = coinTwo.name;
            setDisplayRate(rate);
            return `${nameOne}/${nameTwo}: ${rate.toFixed(2)}`;
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
          unit: days === 1 ? "hour" : days <= 90 ? "day" : "month",
        },
        grid: {
          display: false,
          color: "rgba(0,0,0,0)",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          callback: (value: any) => {
            const date = new Date(value);
            return handleCoinDateDisplay(date, days);
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
    // eslint-disable-next-line semi
  };
};

export const TableChartOptions = {
  elements: {
    point: {
      radius: 50,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  hitRadius: 250,
  scales: {
    y: {
      display: false,
      ticks: {
        display: false,
      },
    },
    x: {
      display: false,
      categoryPercentage: 0.26,
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(0, 0, 0, 0)",
      caretSize: 5,
      caretPadding: 1,
      displayColors: false,
    },
    legend: {
      display: false,
    },
  },
};

export const InvestmentChartOptions = (currencySymbol: string) => {
  return {
    elements: {
      point: {
        radius: 5,
      },
    },
    layout: {
      padding: 20,
    },
    responsive: true,
    maintainAspectRatio: false,
    hitRadius: 10,
    scales: {
      y: {
        display: true,
        ticks: {
          display: true,
          callback: (value: any) => `${value}`,
        },
        grid: {
          display: false,
        },
      },
      x: {
        display: true,
        ticks: {
          display: true,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        caretSize: 6,
        caretPadding: 8,
        displayColors: false,
        callbacks: {
          title: (tooltipItems: any) => {
            const date = tooltipItems[0].label;
            return `Date: ${date}`;
          },
          label: (tooltipItem: any) => {
            const price = tooltipItem.raw;
            return `Price: ${currencySymbol} ${price}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };
};
