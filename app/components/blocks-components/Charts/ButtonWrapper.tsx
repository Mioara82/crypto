import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { DisplayProps } from "./Chart";

const ButtonWrapper = ({
  handleChartDisplayOnMobile,
  showChart,
}: {
  handleChartDisplayOnMobile: () => void;
  showChart: DisplayProps;
}) => {
  return (
    <div className="absolute right-2 top-2 flex gap-2">
      {showChart.next && (
        <button
          className="rounded-full bg-light-lightBg p-3 dark:bg-common-chart-graph-200"
          onClick={handleChartDisplayOnMobile}
          disabled={showChart.prev === true}
        >
          <GrPrevious />
        </button>
      )}
      {showChart.prev && (
        <button
          className="rounded-full bg-light-lightBg p-3 dark:bg-common-chart-graph-200"
          onClick={handleChartDisplayOnMobile}
          disabled={showChart.next === true}
        >
          <GrNext />
        </button>
      )}
    </div>
  );
};

export default ButtonWrapper;
