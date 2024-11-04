import React, { Suspense } from "react";
import { ChartWrapper } from "./ChartWrapper";
import { ChartSkeleton } from "../../UI-components/Skeleton/ChartSkeleton";

export const SuspenseChart = ({
  type,
  children,
}: {
  type: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      {type === "line" ? (
        <Suspense
          fallback={
            <ChartWrapper>
              <ChartSkeleton type="line" />
            </ChartWrapper>
          }
        >
          {children}
        </Suspense>
      ) : (
        <Suspense
          fallback={
            <ChartWrapper>
              <ChartSkeleton type="bar" />
            </ChartWrapper>
          }
        >
          {children}
        </Suspense>
      )}
    </>
  );
};
