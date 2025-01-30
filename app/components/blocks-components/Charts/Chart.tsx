import { useState } from "react";
import { Currency } from "@/lib/features/currencySlice";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { SuspenseChart } from "./SuspenseChart";
import { ChartWrapper } from "./ChartWrapper";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

export interface DisplayProps {
  prev: boolean;
  next: boolean;
}

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
}) => {
  const [showChart, setShowChart] = useState<DisplayProps>({
    prev: true,
    next: false,
  });
  const isMobile = useIsMobile();
  const handleChartDisplayOnMobile = () => {
    setShowChart((prevState: DisplayProps) => {
      if (prevState.prev) {
        return { prev: false, next: true };
      } else if (prevState.next) {
        return { prev: true, next: false };
      }
      return prevState;
    });
  };

  return (
    <>
      {isMobile &&
        (showChart.prev ? (
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
                handleChartDisplayOnMobile={handleChartDisplayOnMobile}
                showChart={showChart}
              />
            </ChartWrapper>
          </SuspenseChart>
        ) : (
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
                handleChartDisplayOnMobile={handleChartDisplayOnMobile}
                showChart={showChart}
              />
            </ChartWrapper>
          </SuspenseChart>
        ))}
      {!isMobile && (
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
                handleChartDisplayOnMobile={handleChartDisplayOnMobile}
                showChart={showChart}
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
                handleChartDisplayOnMobile={handleChartDisplayOnMobile}
                showChart={showChart}
              />
            </ChartWrapper>
          </SuspenseChart>
        </>
      )}
    </>
  );
};

export default Chart;
