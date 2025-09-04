import React from "react";
import CoinsButton from "./CoinsButton";
import ConverterButton from "./ConverterButton";

const ButtonGroup = React.memo(function ButtonGroup() {
  return (
    <div className="flex items-center w-9/12 sm:w-5/12 md:w-[14.6rem] h-10 rounded-2xl overflow-hidden cursor-pointer bg-light-primary dark:bg-[#232336]">
      <CoinsButton />
      <ConverterButton />
    </div>
  );
});

export default ButtonGroup;
