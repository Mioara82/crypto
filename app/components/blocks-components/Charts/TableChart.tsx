import React from "react";
import { ChartSkeleton } from "../../UI-components/Skeleton/ChartSkeleton";
import { formatDateAndTime } from "@/app/utils/formatHelpers";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const colors = ["#FFA500", "#6374C3", "#00B1A7", "#FFA500", "#FFD700", "#6374C3", "#00B1A7", "#FF6347", "#FF0000", "#FFD700"];
export const options = {
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
const TableChart = ({data, index}:{data: any, index: number}) => {  
  const time = Array.from({ length: 168 }, (_, i) => i);
  const isLoaded = data.length > 0;
  const chartData ={
    labels: time.map((hour) => formatDateAndTime(167 - hour)),
    datasets: [
      {
        fill: true,
        tension: 0.75,
        label: "$",
        data: data,
        borderColor: colors[index % 10],
        borderWidth: 1.5,
        pointRadius: 0,
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 380);
          gradient.addColorStop(0, colors[index % 10]);
          gradient.addColorStop(0.15, "rgba(120, 120, 250, 0)");
          return gradient;
        },
      },
    ],
  };
  return (
    <div className="w-full">
      {isLoaded ? <Line options={options} data={chartData} /> : <ChartSkeleton type="line"/>}
    </div>
  );
};
export default TableChart;
