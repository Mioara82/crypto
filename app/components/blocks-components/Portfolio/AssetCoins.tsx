import React, { useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { PortfolioCoin } from "@/lib/features/portfolioSlice";
import CoinCard from "./CoinCard";
import CoinHistoryCard from "./CoinHistoryCard";
import DeleteCoinModal from "./DeleteCoinModal";
import { formatHistoricDate } from "../../../utils/formatHelpers";

const AssetCoins = ({ openEditForm }: { openEditForm: any }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const coins = useAppSelector(
    (state: RootState) => state.portfolioSlice.portfolioCoins,
  );

  const handleDeleteModalDisplay = (id: string) => {
    setSelectedId(id);
  };

  const closeModal = () => {
    setSelectedId(null);
  };

  const deletedCoin = coins?.find(
    (coin: PortfolioCoin) => coin.id === selectedId,
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
      className={`flex w-full max-w-324 flex-col gap-4 ${deletedCoin ? "blur-md" : "blur-none"} relative`}
    >
      {!hasCoins && (
        <div className="relative left-1/2 top-1/2 block -translate-x-1/2 -translate-y-[10%] transform rounded-lg border-[1px] border-skeleton100 border-opacity-40 bg-opacity-45 p-8 text-center md:absolute">
          <h3 className="mb-3 text-sm md:text-base">
            You don&apos;t have any coins in your portfolio
          </h3>
          <h2 className="text-sm md:text-base">
            Press &quot;Add coins&quot; to add purchased coins.
          </h2>
        </div>
      )}
      {hasCoins &&
        coins.map((coin: PortfolioCoin) => {
          const date = formatHistoricDate(coin.purchasedDate);
          const hasProfit =
            uniqueCoinsObj[coin.name].currentPrice > coin.currentPrice;
          return (
            <div key={coin.id}>
              <div className="flex h-auto w-full flex-col rounded-xl bg-gradient-to-r from-[#F2F3E2] to-[#B9E0EE] dark:from-[#43434B] dark:to-[#110744] lg:h-72 lg:flex-row">
                <div className="flex w-full flex-row items-center justify-center gap-4 bg-light-lightBg p-6 dark:bg-dark-darkBg lg:w-1/5 lg:flex-col lg:gap-2">
                  <div className="relative h-8 w-8 rounded-md">
                    <Image
                      src={coin.image}
                      alt="coin icon"
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-base font-bold lg:text-xl">
                      {coin.name}
                      <span className="ml-1">({coin.symbol})</span>
                    </p>
                  </div>
                </div>
                <div className="flex w-full flex-col justify-center gap-4 p-6 lg:w-4/5">
                  <CoinCard
                    params={{ id: coin.id }}
                    handleDeleteModalDisplay={() =>
                      handleDeleteModalDisplay(coin.id)
                    }
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
                {deletedCoin && (
                  <DeleteCoinModal
                    handleDeleteModalDisplay={() =>
                      handleDeleteModalDisplay(deletedCoin.id)
                    }
                    coinId={deletedCoin.id}
                    name={deletedCoin.name}
                    coinImage={deletedCoin.image}
                    closeModal={closeModal}
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AssetCoins;
