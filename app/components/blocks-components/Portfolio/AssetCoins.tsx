import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks/hooks";
import { formatHistoricDate } from "../../../utils/formatHelpers";
import { RootState } from "@/lib/store";
import { PortfolioCoin } from "@/lib/features/portfolioSlice";
import CoinCard from "./CoinCard";
import CoinHistoryCard from "./CoinHistoryCard";

const AssetCoins = () => {
  const coins = useAppSelector(
    (state: RootState) => state.portfolioSlice.portfolioCoins
  );

  const uniqueCoinsObj: any = {};

  const uniqueCoins = coins.reduce(
    (acc: PortfolioCoin[], coin: PortfolioCoin) => {
      if (!acc.some((c) => c.id === coin.id)) {
        acc.push(coin);
      }
      return acc;
    },
    []
  );
  uniqueCoins.forEach(
    (coin: PortfolioCoin) => (uniqueCoinsObj[coin.name] = coin)
  );

  const hasCoins = coins && coins.length > 0;

  return (
    <div className="flex flex-col gap-4 max-w-324 w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {hasCoins &&
        coins.map((coin: PortfolioCoin) => {
          const date = formatHistoricDate(coin.purchasedDate);
          const hasProfit =
            uniqueCoinsObj[coin.name].currentPrice > coin.currentPrice;
          return (
            <div key={coin.id}>
              <div className="flex w-full h-72 bg-light-primary dark:bg-dark-191">
                <div className="w-1/5 dark:bg-dark-darkBg p-6 flex flex-col justify-center items-center gap-2">
                  <div className="rounded-md">
                    <Image
                      src={coin.image}
                      alt="coin icon"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <p className="text-xl font-bold">
                      {coin.name}
                      <span>({coin.symbol})</span>
                    </p>
                  </div>
                </div>
                <div className="w-4/5 p-6 flex flex-col justify-center gap-4 ">
                  <CoinCard params={{ id: coin.id }} id={coin.id} />
                  <hr className="bg-light-primary/80"></hr>
                  <CoinHistoryCard
                    date={date}
                    amount={coin.purchaseAmount}
                    params={{ id: coin.id }}
                    currentPrice={coin.currentPrice}
                    hasProfit={hasProfit}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AssetCoins;
