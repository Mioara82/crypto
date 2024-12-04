"use client";
import React from "react";
import ButtonGroup from "../components/UI-components/ButtonGroup";
import ConverterBox from "../components/blocks-components/Converter/ConverterBox";
import ConverterChart from "../components/blocks-components/Converter/ConverterChart";
import ConverterHeading from "../components/blocks-components/Converter/ConverterHeading";
import ChartFilterTabs from "../components/UI-components/ChartFilterTabs";

export default function Converter() {
  return (
    <div className="h-auto overscroll-none flex flex-col w-maxWidth-custom mx-[72px] gap-10 bg-light-primaryBg dark:bg-dark-primaryBg">
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
