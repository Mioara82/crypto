import React from "react";

interface ChartWrapperProps {
  children: React.ReactNode;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({ children }) => (
  <div className="relative m-auto max-w-[90%] rounded-xl md:m-0 md:w-full">
    {children}
  </div>
);
