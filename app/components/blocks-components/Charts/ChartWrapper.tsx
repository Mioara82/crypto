import React from "react";

interface ChartWrapperProps {
  children: React.ReactNode;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({ children }) => (
  <div className="relative max-w rounded-2xl md:m-0 md:w-full">
    {children}
  </div>
);
