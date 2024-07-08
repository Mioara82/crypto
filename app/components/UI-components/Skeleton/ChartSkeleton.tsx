import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface ChartSkeletonProps {
  type: "line" | "bar";
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};

const labels = ["01", "02", "03", "04", "05", "06", "07"];
//const prices = [1000,2000, 3000,4000,5000,6000,7000]

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: labels.map(() => Math.round(Math.random() * 10000)),
      borderColor: "rgb(220, 224, 228)",
      backgroundColor: "rgba(245, 246, 244, 0.5)",
    },
  ],
};

export const data2 = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.round(Math.random() * 10000)),
      backgroundColor: "rgba(245, 246, 244, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.round(Math.random() * 10000)),
      backgroundColor: "rgba(245, 246, 244, 0.5)",
    },
  ],
};

export function ChartSkeleton({ type }: ChartSkeletonProps) {
  return (
    <>
      {type === "line" ? (
        <Line options={options} data={data} />
      ) : (
        <Bar options={options} data={data2} />
      )}
    </>
  );
}
