"use client";
import { lazy } from "react";
import { Suspense } from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useGetSearchDataQuery } from "@/lib/api";
import { RootState } from "@/lib/store";
import ButtonGroup from "./components/UI-components/ButtonGroup";
import ChartsContainer from "./components/blocks-components/Charts/ChartsContainer";
import CarouselSkeleton from "./components/UI-components/Skeleton/CarouselSkeleton";
import ChartFilterTabs from "./components/UI-components/ChartFilterTabs";
import SelectedCoins from "./components/blocks-components/SelectedCoins";
import TableSkeleton from "./components/UI-components/Skeleton/TableSkeleton";

const CoinCarousel = lazy(
  () => import("./components/blocks-components/CoinCarousel/CoinCarousel")
);

const CoinsTable = lazy(
  () => import("./components/blocks-components/CoinTable/CoinsTable")
);

export default function Home() {
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName
  );
  const selectedFilter = useAppSelector(
    (state: RootState) => state.converter.selectedFilter
  );

  const { data, isSuccess } = useGetSearchDataQuery(currency);
  const coinList = data?.slice(0, 20);

  return (
    <>
      <main className="mx-2 w-full h-full overscroll-none flex flex-col w-maxWidth-custom lg:mx-[72px] gap-10 bg-light-primaryBg dark:bg-dark-primaryBg">
        <ButtonGroup />
        <p className="text-light-secondaryTextColor dark:text-dark-chartTextColor ml-3">
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
        <SelectedCoins/>
        <ChartsContainer currency={currency} days={selectedFilter.period} />
        <ChartFilterTabs />
        <Suspense fallback={<TableSkeleton />}>
          <CoinsTable />
        </Suspense>
      </main>
    </>
  );
}
