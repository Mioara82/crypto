import React from "react";
import { capitaliseString } from "@/app/utils/formatHelpers";

export const TableTitle = ({value}:{value: string}) => {
  return (
    <div className="text-2xl">
      TOP 50 <span className="text-lg">BY </span>
      {capitaliseString(value)}
    </div>
  );
};
