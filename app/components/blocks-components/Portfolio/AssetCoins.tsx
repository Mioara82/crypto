import React, { useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { PortfolioCoin } from "@/lib/features/portfolioSlice";
import CoinCard from "./CoinCard";
import CoinHistoryCard from "./CoinHistoryCard";
import { formatHistoricDate } from "../../../utils/formatHelpers";

const AssetCoins = ({ openEditForm }: { openEditForm: any }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const handleDeleteModalDisplay = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };
  const coins = useAppSelector(
    (state: RootState) => state.portfolioSlice.portfolioCoins,
  );

  const uniqueCoinsObj = coins.reduce((acc: any, coin: PortfolioCoin) => {
    if (!acc[coin.id]) {
      acc[coin.name] = coin;
    }
    return acc;
  }, {});

  const hasCoins = coins && coins.length > 0;

  return (
    <div
      className={`flex w-full max-w-324 flex-col gap-4 ${
        isDeleteModalOpen ? "blur-md" : "blur-none"
      } relative`}
    >
      {hasCoins &&
        coins.map((coin: PortfolioCoin) => {
          const date = formatHistoricDate(coin.purchasedDate);
          const hasProfit =
            uniqueCoinsObj[coin.name].currentPrice > coin.currentPrice;
          return (
            <div key={coin.id}>
              <div className="flex h-72 w-full rounded-xl bg-portfolioGradientLight dark:bg-portfolioGradientDark">
                <div className="flex w-1/5 flex-col items-center justify-center gap-2 p-6 dark:bg-dark-darkBg">
                  <div className="relative h-8 w-8 rounded-md">
                    <Image
                      src={coin.image}
                      alt="coin icon"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold">
                      {coin.name}
                      <span className="ml-1">({coin.symbol})</span>
                    </p>
                  </div>
                </div>
                <div className="flex w-4/5 flex-col justify-center gap-4 p-6">
                  <CoinCard
                    params={{ id: coin.id }}
                    handleDeleteModalDisplay={handleDeleteModalDisplay}
                    isDeleteModalOpen={isDeleteModalOpen}
                  />
                  <hr className="bg-light-primary/80"></hr>
                  <CoinHistoryCard
                    date={date}
                    amount={coin.purchaseAmount}
                    params={{ id: coin.id }}
                    currentPrice={coin.currentPrice}
                    hasProfit={hasProfit}
                    openEditForm={() => openEditForm(coin.id)}
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
