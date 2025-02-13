import React from "react";
import CoinsButton from "./CoinsButton";
import ConverterButton from "./ConverterButton";

const ButtonGroup = React.memo(function ButtonGroup() {
  return (
    <div className="flex h-[53px] justify-center gap-1 rounded-md p-1 md:w-[506px] md:justify-start">
      <CoinsButton />
      <ConverterButton />
    </div>
  );
});

export default ButtonGroup;
