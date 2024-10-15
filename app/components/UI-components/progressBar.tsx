import React from "react";

const ProgressBar = (props: any) => {
  const computedValue = props.value > 5 ? props.value : 5;
  return (
    <div
      className={`relative ${
        props.data ? "w-[53px]" : "w-full"
      } h-[6px] rounded-sm`}
      style={{ background: props.colorTwo }}
    >
      <div
        className="absolute top-0 left-0 h-[6px] rounded-sm bg-common-purple"
        style={{ width: `${computedValue}%`, background: props.color }}
      ></div>
    </div>
  );
};

export default ProgressBar;
