import React from "react";

const ProgressBar = (props: any) => {
  const barWidth = Math.round(0.53 * props.value);
  const barColor = props.color;
  return (
    <div className="relative w-[53px] h-[6px] rounded-sm bg-[#FFFFFF66]">
      <div
        className="absolute top-0 left-0 bg-common-purple"
        style={{ width: `${barWidth}px`, background: barColor }}
      ></div>
    </div>
  );
};

export default ProgressBar;
