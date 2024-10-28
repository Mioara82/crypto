"use client";
import { useState, lazy } from "react";
import { Suspense } from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useIsActive } from "@/lib/hooks/useIsActive";
import { useGetSearchDataQuery } from "@/lib/api";
import { RootState } from "@/lib/store";
import { CoinProps } from "./components/CoinCarousel/CoinDetailsCarousel";
import ButtonGroup from "./components/UI-components/ButtonGroup";
import { CompareButton } from "./components/CoinCarousel/CompareButton";
import { ChartSkeleton } from "./components/UI-components/Skeleton/ChartSkeleton";
import CarouselSkeleton from "./components/UI-components/Skeleton/CarouselSkeleton";
import ChartFilterTabs from "./components/UI-components/ChartFilterTabs";
import { chartFilter } from "./utils/chartFilter";
import { daysObject } from "@/lib/types/types";

const CoinCarousel = lazy(
  () => import("./components/CoinCarousel/CoinCarousel")
);
const LineChart = lazy(
  () => import("./components/blocks-components/Charts/LineChart")
);
const BarChart = lazy(
  () => import("./components/blocks-components/Charts/BarChart")
);
const CoinsTable = lazy(
  () => import("./components/blocks-components/CoinTable/CoinsTable")
);

interface ChartWrapperProps {
  children: React.ReactNode;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ children }) => (
  <div className="w-full p-6 rounded-xl relative">{children}</div>
);

export default function Home() {
  const [isActive, setIsActive] = useIsActive(0);
  const [isCompared, setIsCompared] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<daysObject>(
    chartFilter[0]
  );

  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName
  );
  const { data, isSuccess } = useGetSearchDataQuery(currency);
  const coinList = data?.slice(0, 20);

  const handleActiveButton = (value: number) => {
    setIsActive((prev) => (prev === value ? null : value));
  };

  const handleChartComparison = () => {
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
        <ButtonGroup isActive={isActive} handleActiveButton={handleActiveButton}/>
        <div className="flex gap-[72px] items-center">
          <p className="text-light-secondaryTextColor dark:text-dark-chartTextColor ml-3">
            Select the currency to view statistics
          </p>
          <CompareButton
            isCompared={isCompared}
            handleChartComparison={handleChartComparison}
          />
        </div>
        <Suspense fallback={<CarouselSkeleton />}>
          <div>
            {isSuccess ? (
              <div>
                <CoinCarousel
                  list={coinList}
                  isActive={coinList.findIndex(
                    (coin: CoinProps) => coin.id === selectedCoinId
                  )}
                  currency={currency}
                  onSelectCoin={(id: string) => setSelectedCoinId(id)}
                />
              </div>
            ) : null}
          </div>
        </Suspense>
        {isSuccess &&
          coinList.length > 0 &&
          (selectedCoinId ? (
            <div className="flex justify-center w-maxWidth gap-10 p-4">
              <Suspense
                fallback={
                  <ChartWrapper>
                    <ChartSkeleton type="line" />
                  </ChartWrapper>
                }
              >
                <ChartWrapper>
                  <LineChart
                    params={{ id: selectedCoinId }}
                    coin={coinList.find(
                      (coin: CoinProps) => coin.id === selectedCoinId
                    )}
                    currency={currency}
                    days={selectedFilter.period}
                  />
                </ChartWrapper>
              </Suspense>
              <Suspense
                fallback={
                  <ChartWrapper>
                    <ChartSkeleton type="bar" />
                  </ChartWrapper>
                }
              >
                <ChartWrapper>
                  <BarChart
                    params={{ id: selectedCoinId }}
                    currency={currency}
                    days={selectedFilter.period}
                  />
                </ChartWrapper>
              </Suspense>
            </div>
          ) : (
            //show default coin charts before user selection
            <div className="flex justify-center w-maxWidth gap-10 p-4">
              <Suspense
                fallback={
                  <ChartWrapper>
                    <ChartSkeleton type="line" />
                  </ChartWrapper>
                }
              >
                <ChartWrapper>
                  <LineChart
                    params={{ id: "bitcoin" }}
                    coin={coinList[0]}
                    currency={currency}
                    days={selectedFilter.period}
                  />
                </ChartWrapper>
              </Suspense>
              <Suspense
                fallback={
                  <ChartWrapper>
                    <ChartSkeleton type="bar" />
                  </ChartWrapper>
                }
              >
                <ChartWrapper>
                  <BarChart
                    params={{ id: "bitcoin" }}
                    currency={currency}
                    days={selectedFilter.period}
                  />
                </ChartWrapper>
              </Suspense>
            </div>
          ))}
        <ChartFilterTabs
          days={selectedFilter}
          handleSelectedFilter={handleSelectedFilter}
        />
        <CoinsTable />
      </main>
    </>
  );
}
