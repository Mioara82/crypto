import { ChartData, ScriptableContext } from "chart.js";
import { formatDateAndTime } from "../formatHelpers";
import { coinTableColors } from "../colours";

export const createLineChartData = (
  labels: any,
  timestamps:any,
  coinOne: { id?: string } | null,
  coinOnePrices: number[],
  coinTwo: { id?: string } | null,
  coinTwoPrices: number[]
): ChartData<"line"> => {
  const datasets: any = [];

  if (coinOne) {
    datasets.push({
      label: coinOne.id || "Coin One",
      data: coinOnePrices,
      borderColor: "#7878FA",
      borderWidth: 3,
      borderRadius: 3,
      categoryPercentage: 0.75,
      backgroundColor: (context: ScriptableContext<"line">) => {
        const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "#7878FA");
        gradient.addColorStop(0.65, "rgba(120, 120, 250, 0)");
        return gradient;
      },
      pointRadius: 0,
      pointHoverRadius: 0,
      borderCapStyle: "round",
      borderJoinStyle: "round",
      fill: true,
    });
  }

  if (coinTwo) {
    datasets.push({
      label: coinTwo.id || "Coin Two",
      data: coinTwoPrices,
      borderColor: "#D878FA",
      borderWidth: 3,
      borderRadius: 3,
      categoryPercentage: 0.75,
      backgroundColor: (context: ScriptableContext<"line">) => {
        const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "#D878FA");
        gradient.addColorStop(0.65, "rgba(216, 120, 250, 0)");
        return gradient;
      },
      pointRadius: 0,
      pointHoverRadius: 0,
      borderCapStyle: "round",
      borderJoinStyle: "round",
      fill: true,
    });
  }

  return {
    labels:timestamps,
    datasets,
  };
};

export const createBarChartData = (
  labels: any,
  coinOne: { id?: string } | null,
  coinOneVolumes: number[],
  coinTwo: { id?: string } | null,
  coinTwoVolumes: number[]
): ChartData<"bar"> => {

  const datasets: any = [];

  if (coinOne) {
    datasets.push({
      label: coinOne.id || "Coin One",
      data: coinOneVolumes,
      borderColor: "#7878FA",
      borderWidth: 10,
      borderRadius: 3,
      barPercentage: 1,
      categoryPercentage: 0.5,
      backgroundColor: (context: ScriptableContext<"line">) => {
        const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "#7878FA");
        gradient.addColorStop(0.65, "rgba(120, 120, 250, 0)");
        return gradient;
      },
      pointRadius: 0,
      fill: true,
      tension: 0.8,
    });
  }

  if (coinTwo) {
    datasets.push({
      label: coinTwo.id || "Coin Two",
      data: coinTwoVolumes,
      borderColor: "#D878FA",
      borderWidth: 3,
      borderRadius: 3,
      barPercentage: 1,
      categoryPercentage: 0.5,
      backgroundColor: (context: ScriptableContext<"line">) => {
        const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "#D878FA");
        gradient.addColorStop(0.65, "rgba(216, 120, 250, 0)");
        return gradient;
      },
      pointRadius: 0,
      fill: true,
      tension: 0.8,
    });
  }

  return {
    labels,
    datasets,
  };
};

export const ConverterChartData = (
  labels: any,
  conversionRates: any
): ChartData<"line"> => ({
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
});

export const TableChartData = (time:any,index:number,data:any) =>{
  return{
  labels: time.map((hour:any) => formatDateAndTime(167 - hour)),
  datasets: [
    {
      fill: true,
      tension: 0.75,
      label: "$",
      data: data,
      borderColor: coinTableColors[index % 10],
      borderWidth: 1.5,
      pointRadius: 0,
      backgroundColor: (context: any) => {
        const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 380);
        gradient.addColorStop(0, coinTableColors[index % 10]);
        gradient.addColorStop(0.15, "rgba(120, 120, 250, 0)");
        return gradient;
      },
    },
  ],
};
};