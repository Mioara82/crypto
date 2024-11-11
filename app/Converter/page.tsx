"use client";
import React from "react";
import { formatLabelDate } from "../utils/formatHelpers";
import ConverterBox from "../components/blocks-components/Converter/ConverterBox";
import ConverterChart from "../components/blocks-components/Converter/ConverterChart";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";

export default function Converter() {
  const currentDate = formatLabelDate();
  const selectedFilter = useAppSelector(
    (state: RootState) => state.converter.selectedFilter
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h3>Online currency convertor</h3>
        <h5>{currentDate}</h5>
      </div>
      <ConverterBox />
      <ConverterChart days={selectedFilter.period} />
    </main>
  );
}
