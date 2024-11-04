"use client";
import { useState, lazy } from "react";
import { Suspense } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { useIsActive } from "@/lib/hooks/useIsActive";
import { useGetSearchDataQuery } from "@/lib/api";
import { RootState } from "@/lib/store";
import ButtonGroup from "./components/UI-components/ButtonGroup";
import CarouselHeader from "./components/UI-components/CarouselHeader";
import ChartsWrapper from "./components/blocks-components/Charts/ChartsContainer";
import CarouselSkeleton from "./components/UI-components/Skeleton/CarouselSkeleton";
import ChartFilterTabs from "./components/UI-components/ChartFilterTabs";
import { chartFilter } from "./utils/chartFilter";
import { daysObject } from "@/lib/types/types";
import { deleteAllCoins } from "@/lib/features/coinSlice";

const CoinCarousel = lazy(
  () => import("./components/CoinCarousel/CoinCarousel")
);

const CoinsTable = lazy(
  () => import("./components/blocks-components/CoinTable/CoinsTable")
);

export default function Home() {
  const [isActive, setIsActive] = useIsActive(0);
  const [isCompared, setIsCompared] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<daysObject>(
    chartFilter[0]
  );
  const dispatch = useAppDispatch();
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName
  );

  const { data, isSuccess } = useGetSearchDataQuery(currency);
  const coinList = data?.slice(0, 20);

  const handleActiveButton = (value: number) => {
    setIsActive((prev) => (prev === value ? null : value));
  };

  const handleChartComparison = () => {
    if (!isCompared) {
      dispatch(deleteAllCoins());
    }
    setIsCompared((prev) => !prev);
  };

  const handleSelectedFilter = (id: number) => {
    const found = chartFilter.find((item) => item.id === id);
    if (!found) {
      return;
    } else {
      setSelectedFilter(found);
    }
  };

  return (
    <>
      <main
        id="scrollable-container"
        className="h-full overflow-y-auto flex flex-col w-maxWidth-custom mx-[72px] gap-[40px] bg-light-primaryBg dark:bg-dark-primaryBg"
      >
        <ButtonGroup
          isActive={isActive}
          handleActiveButton={handleActiveButton}
        />
        <CarouselHeader
          isCompared={isCompared}
          handleChartComparison={handleChartComparison}
        />
        <Suspense fallback={<CarouselSkeleton />}>
          <div>
            {isSuccess ? (
              <div>
                <CoinCarousel list={coinList} currency={currency} />
              </div>
            ) : null}
          </div>
        </Suspense>
        <ChartsWrapper currency={currency} days={selectedFilter.period} />
        <ChartFilterTabs
          days={selectedFilter}
          handleSelectedFilter={handleSelectedFilter}
        />
        <CoinsTable />
      </main>
    </>
  );
}
