import React from "react";
import { ChartSkeleton } from "../../UI-components/Skeleton/ChartSkeleton";
import { TableChartOptions } from "@/app/utils/ChartUtils/chartOptions";
import { TableChartData } from "@/app/utils/ChartUtils/chartData";
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
  Legend
);

const TableChart = ({ data, index }: { data: any; index: number }) => {
  const time = Array.from({ length: 168 }, (_, i) => i);
  const isLoaded = data.length > 0;
  const chartData = TableChartData(time, index, data);
  return (
    <div className="max-w-[140px] h-[37px] flex justify-centre items-centre m-auto">
      {isLoaded ? (
        <Line options={TableChartOptions} data={chartData} />
      ) : (
        <ChartSkeleton type="line" />
      )}
    </div>
  );
};
export default TableChart;
