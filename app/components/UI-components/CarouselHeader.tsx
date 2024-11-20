import React from "react";
import { CompareButton } from "../blocks-components/CoinCarousel/CompareButton";

const CarouselHeader = React.memo(function CarouselGroup({
  isCompared,
  handleChartComparison,
}: {
  isCompared: boolean;
  handleChartComparison: () => void;
}) {
  return (
    <div className="flex gap-[72px] items-center">
      <p className="text-light-secondaryTextColor dark:text-dark-chartTextColor ml-3">
        Select the currency to view statistics
      </p>
      <CompareButton
        isCompared={isCompared}
        handleChartComparison={handleChartComparison}
      />
    </div>
  );
});

export default CarouselHeader;