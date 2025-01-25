import React from "react";

interface ChartWrapperProps {
  children: React.ReactNode;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({ children }) => (
  <div className="w-full p-2 lg:p-6 rounded-xl relative">{children}</div>
);
