import React from "react";
import { CloseIcon } from "@/app/icons/closeIcon";
import { CompareChartsIcon } from "@/app/icons/compareChartsIcon";

export const CompareButton = ({
  isCompared,
  handleChartComparison,
}: {
  isCompared: boolean;
  handleChartComparison: () => void;
}) => {
  return (
    <>
      <button className="dark:bg-dark-hover w-[192px] h-12 ml-auto rounded-md" onClick={handleChartComparison}>
        <div className="flex items-center justify-around">
          <div>{isCompared ? <CloseIcon /> : <CompareChartsIcon />}</div>
          <p>{`${isCompared ? "Exit comparison" : "Compare"}`}</p>
        </div>
      </button>
    </>
  );
};
