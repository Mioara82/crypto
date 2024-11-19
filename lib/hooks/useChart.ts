import { useEffect, useRef } from "react";
import { Chart} from "chart.js";

export const useChart = (
  chartId: string,
  chartData: any,
  options: any
) => {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const canvas = document.getElementById(chartId) as HTMLCanvasElement | null;
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
  }, [chartId, chartData, options]);

  return chartRef;
};
