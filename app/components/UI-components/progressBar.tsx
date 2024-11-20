import React from "react";

const ProgressBar = (props: any) => {
  const computedValue = props.value > 5 ? props.value : 5;
  const colorGradient = "linear-gradient(to right, #7517f8, #e323ff)";
  return (
    <div
      className={`relative ${props.data ? "w-[53px]" : "w-full"} ${
        props.gradient ? "h-[16px]" : "h-[6px]"
      } rounded-sm`}
      style={{ background: props.colorTwo }}
    >
      <div
        className="absolute top-0 left-0 h-[6px] rounded-sm bg-common-purple"
        style={{
          width: `${computedValue}%`,
          background: `${props.gradient ? colorGradient : props.color}`,
          height: `${props.gradient ? "16px" : "6px"}`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
