import React from "react";
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
import { InvestmentChartOptions } from "@/app/utils/ChartUtils/chartOptions";
import { InvestmentChartData } from "@/app/utils/ChartUtils/chartData";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

interface LineChartProps {
  historicDates: Date[];
  historicPrices: number[];
  coin: any;
  currencySymbol: string;
}

const LineChart: React.FC<LineChartProps> = ({
  historicDates,
  historicPrices,
  coin,
  currencySymbol,
}) => {
  const isLoaded = historicDates.length > 0 && historicPrices.length > 0;

  return (
    <div>
      {isLoaded ? (
        <div className="flex flex-col justify-start bg-light-primary p-6 dark:bg-dark-darkBg">
          <p className="text-xl font-normal text-light-secondaryTextColor dark:text-dark-chartDateColor">
            {coin.name}
          </p>
          <div className="h-[440px] w-full">
            <Line
              data={InvestmentChartData(historicDates, historicPrices)}
              options={InvestmentChartOptions(currencySymbol)}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-start rounded-md bg-light-primary p-6 dark:bg-dark-darkBg">
          No data to show
        </div>
      )}
    </div>
  );
};

export default LineChart;
