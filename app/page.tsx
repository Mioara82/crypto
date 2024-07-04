"use client";
import { useState } from "react";
import { Suspense } from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useIsActive } from "@/lib/hooks/useIsActive";
import { useGetSearchDataQuery } from "@/lib/api";
import { RootState } from "@/lib/store";
import { CoinProps } from "./components/UI-components/CoinDetailsCarousel";
import Button from "./components/UI-components/Button";
import CoinCarousel from "./components/blocks-components/CoinCarousel";
import LineChart from "./components/blocks-components/LineChart";
import BarChart from "./components/blocks-components/BarChart";

export default function Home() {
  const [isActive, setIsActive] = useIsActive(0);
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(null);
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName
  );
  const { data, isSuccess } = useGetSearchDataQuery(currency);
  const coinList = data?.slice(0, 20);

  const handleActiveButton = (value: number) => {
    setIsActive((prev) => (prev === value ? null : value));
  };

  return (
    <>
      <main className="flex flex-col w-maxWidth h-[1675px] mx-[72px] gap-[40px] bg-light-primaryBg dark:bg-dark-primaryBg ">
        <div className="flex justify-start w-[506px] h-[53px] rounded-md p-1">
          <Button
            text="Coins"
            isActive={isActive === 0}
            onButtonClick={() => handleActiveButton(0)}
          />
          <Button
            text="Converter"
            isActive={isActive === 1}
            onButtonClick={() => handleActiveButton(1)}
          />
        </div>
        <div className="flex flex-col gap-[72px]">
          <p className="text-light-secondaryTextColor dark:text-dark-chartTextColor">
            Select the currency to view statistics
          </p>
        </div>
        <Suspense fallback={<p>Loading data...</p>}>
          <div>
            {isSuccess ? (
              <CoinCarousel
                list={coinList}
                isActive={coinList.findIndex(
                  (coin: CoinProps) => coin.id === selectedCoinId
                )}
                currency={currency}
                onSelectCoin={(id: string) => setSelectedCoinId(id)}
              />
            ) : null}
          </div>
          {isSuccess && coinList.length > 0 ? (
            selectedCoinId ? (
              <div className="flex justify-center w-maxWidth gap-10 p-4">
                <div className="w-1/2 h-[404px] p-6 rounded-xl relative">
                  <LineChart
                    params={{ id: selectedCoinId }}
                    coin={coinList.find(
                      (coin: CoinProps) => coin.id === selectedCoinId
                    )}
                    currency={currency}
                  />
                </div>
                <div className="w-1/2 h-[404px] p-6 rounded-xl relative">
                  <BarChart
                    params={{ id: selectedCoinId }}
                    currency={currency}
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-center w-maxWidth gap-10 p-4">
                <div className="flex-1">
                  <LineChart
                    params={{ id: "bitcoin" }}
                    coin={coinList[0]}
                    currency={currency}
                  />
                </div>
                <div className="flex-1">
                  <BarChart params={{ id: "bitcoin" }} currency={currency} />
                </div>
              </div>
            )
          ) : (
            <p>Error loading data</p>
          )}
        </Suspense>
      </main>
    </>
  );
}
