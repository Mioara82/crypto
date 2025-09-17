import React from "react";
import CoinsButton from "./CoinsButton";
import ConverterButton from "./ConverterButton";

const ButtonGroup = React.memo(function ButtonGroup() {
  return (
    <div className="flex items-center w-full sm:w-5/12 md:w-[14.6rem] rounded-md p-2 overflow-hidden cursor-pointer bg-light-primary dark:bg-[#232336]">
      <CoinsButton />
      <ConverterButton />
    </div>
  );
});

export default ButtonGroup;
