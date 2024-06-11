"use client";
import { Suspense } from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useIsActive } from "@/lib/hooks/useIsActive";
import { useGetSearchDataQuery } from "@/lib/api";
import Button from "./components/UI-components/Button";
import CoinCarousel from "./components/blocks-components/CoinCarousel";
import { RootState } from "@/lib/store";

export default function Home() {
  const [isActive, setIsActive] = useIsActive(0);
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
                isActive={isActive}
                currency={currency}
              />
            ) : null}
          </div>
        </Suspense>
      </main>
    </>
  );
}
