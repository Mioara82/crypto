import { Currency } from "@/lib/features/currencySlice";
import { SuspenseChart } from "./SuspenseChart";
import { ChartWrapper } from "./ChartWrapper";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

const Chart = ({
  chartType,
  currency,
  days,
  coinOne,
  coinOneName,
  coinTwo = null,
  coinTwoName = "n/a",
  isLinear,
  isLogarithmic,
}: {
  chartType: "linear" | "logarithmic";
  currency: Currency;
  days: number;
  coinOne: any;
  coinOneName: string;
  coinTwo?: any;
  coinTwoName?: string;
  isLinear: any;
  isLogarithmic: any;
}) => (
  <>
    <SuspenseChart type="line">
      <ChartWrapper>
        <LineChart
          coinOne={coinOne}
          coinOneName={coinOneName}
          coinTwo={coinTwo}
          coinTwoName={coinTwoName}
          chartType={chartType}
          currency={currency}
          days={days}
          isLinear={isLinear}
          isLogarithmic={isLogarithmic}
        />
      </ChartWrapper>
    </SuspenseChart>
    <SuspenseChart type="bar">
      <ChartWrapper>
        <BarChart
          coinOne={coinOne}
          coinOneName={coinOneName}
          coinTwo={coinTwo}
          coinTwoName={coinTwoName}
          chartType={chartType}
          currency={currency}
          days={days}
          isLinear={isLinear}
          isLogarithmic={isLogarithmic}
        />
      </ChartWrapper>
    </SuspenseChart>
  </>
);

export default Chart;
