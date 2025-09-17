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
  const coinList = data?.slice(0, 30);

  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center">
        <main className="md:m-aut0 flex w-full max-w-324 flex-col justify-center gap-6 overscroll-none px-6 lg:px-7 dark:bg-dark-primaryBg md:px-16 xl:mx-4">
          <ButtonGroup />
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
      </div>
    </>
  );
}
