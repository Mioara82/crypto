import React from "react";

const ProgressBar = (props: any) => {
  return (
    <div className="relative w-[53px] h-[6px] rounded-sm bg-[#FFFFFF66]">
      <div
        className="absolute top-0 left-0 h-[6px] rounded-sm bg-common-purple"
        style={{ width: props.value > 5 ? `${props.value}%` : "5%", background: props.color }}
      ></div>
    </div>
  );
};

export default ProgressBar;
