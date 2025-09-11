import React from "react";

interface ChartWrapperProps {
  children: React.ReactNode;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({ children }) => (
  <div className="relativemax-w rounded-2xl md:m-0 md:w-full">
    {children}
  </div>
);
