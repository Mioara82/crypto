import { ChartData, ScriptableContext } from "chart.js";

export const createLineChartData = (
  labels: any,
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
    labels,
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
      categoryPercentage: 0.75,
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
      categoryPercentage: 0.75,
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
