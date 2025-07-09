"use client";
import { lazy } from "react";
import { Suspense } from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useGetSearchDataQuery } from "@/lib/api";
import type { RootState } from "@/lib/store";
import ButtonGroup from "./components/UI-components/ButtonGroup";
import ChartsContainer from "./components/blocks-components/Charts/ChartsContainer";
import CarouselSkeleton from "./components/UI-components/Skeleton/CarouselSkeleton";
import ChartFilterTabs from "./components/UI-components/ChartFilterTabs";
import SelectedCoins from "./components/blocks-components/SelectedCoins";
import TableSkeleton from "./components/UI-components/Skeleton/TableSkeleton";

const CoinCarousel = lazy(
  () => import("./components/blocks-components/CoinCarousel/CoinCarousel"),
);

const CoinsTable = lazy(
  () => import("./components/blocks-components/CoinTable/CoinsTable"),
);

export default function Home() {
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName,
  );
  const selectedFilter = useAppSelector(
    (state: RootState) => state.converter.selectedFilter,
  );

  const { data, isSuccess } = useGetSearchDataQuery({
    endpoint: "SearchData",
    query: { currency: currency.toLowerCase() },
  });
  const coinList = data?.slice(0, 20);

  return (
    <>
      <main className="flex w-full max-w-[100rem] flex-col justify-center gap-10 overscroll-none dark:bg-dark-primaryBg md:m-aut0 xl:mx-4 px-4">
        <ButtonGroup />
        <p className="ml-3 text-sm text-light-secondaryTextColor dark:text-dark-chartTextColor md:text-base">
          Select the currency to view statistics
        </p>
        <Suspense fallback={<CarouselSkeleton />}>
          <div>
            {isSuccess ? (
              <div>
                <CoinCarousel list={coinList} currency={currency} />
              </div>
            ) : null}
          </div>
        </Suspense>
        <SelectedCoins />
        <ChartsContainer currency={currency} days={selectedFilter.period} />
        <ChartFilterTabs />
        <Suspense fallback={<TableSkeleton />}>
          <CoinsTable />
        </Suspense>
      </main>
    </>
  );
}
