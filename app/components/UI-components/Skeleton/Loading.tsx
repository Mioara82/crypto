import React, { useState } from "react";
import ProgressBar from "../progressBar";
import { useInterval } from "@/lib/hooks/useInterval";

const LoadingCard = () => {
  const [progress, setProgress] = useState<number>(0);
  useInterval(() => {
    setProgress((prev: any) => {
      if (prev < 100) {
        return prev + 1;
      }
      return 100;
    });
  }, 50);
  return (
    <div className="w-full mt-11 p-6">
      <ProgressBar value={progress} gradient={true} colorTwo="#5a5a89" />
      <h3 className="text-sm md:text-base xl:text-xl text-center mt-11">
        Loading, please wait
      </h3>
    </div>
  );
};

export default LoadingCard;
