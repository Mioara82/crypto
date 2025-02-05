"use client";
import React from "react";
import ButtonGroup from "../components/UI-components/ButtonGroup";
import ConverterBox from "../components/blocks-components/Converter/ConverterBox";
import ConverterChart from "../components/blocks-components/Converter/ConverterChart";
import ConverterHeading from "../components/blocks-components/Converter/ConverterHeading";
import ChartFilterTabs from "../components/UI-components/ChartFilterTabs";

export default function Converter() {
  return (
    <div className="w-maxWidth-custom mx-6 mb-6 flex h-auto flex-col gap-10 overscroll-none bg-light-primaryBg dark:bg-dark-primaryBg md:mx-[72px]">
      <ButtonGroup />
      <ConverterHeading />
      <ConverterBox />
      <div className="flex flex-col gap-10">
        <ConverterChart />
        <ChartFilterTabs />
      </div>
    </div>
  );
}
