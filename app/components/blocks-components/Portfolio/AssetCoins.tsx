import React, { useState } from "react";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import CoinCard from "./CoinCard";
import CoinHistoryCard from "./CoinHistoryCard";
import DeleteCoinModal from "./DeleteCoinModal";
import { formatHistoricDate } from "../../../utils/formatHelpers";
import type { Id } from "@/convex/_generated/dataModel";
import type { Doc } from "@/convex/_generated/dataModel";

const AssetCoins = ({
  openEditForm,
  userId,
}: {
  openEditForm: any;
  userId: Id<"users">;
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const coins = useQuery(
    api.portfolioCoins.getPortfolioCoins,
    userId ? { userId } : "skip",
  );

  const handleDeleteModalDisplay = (id: string) => {
    setSelectedId(id);
  };

  const closeModal = () => {
    setSelectedId(null);
  };
  type PortfolioCoin = Doc<"portfolioCoins">;

  const deletedCoin = coins?.find((coin:PortfolioCoin) => coin._id === selectedId);

  const uniqueCoinsObj = (coins ?? []).reduce<Record<string, PortfolioCoin>>(
    (acc, coin) => {
      if (!acc[coin.coinId]) {
        acc[coin.name] = coin;
      }
      return acc;
    },
    {},
  );

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
          const currentPrice = uniqueCoinsObj[coin.name]?.currentPrice;
          const purchasePrice = coin.currentPrice;
          const hasProfit =
            currentPrice !== undefined &&
            purchasePrice !== undefined &&
            currentPrice > purchasePrice;
            
          return (
            <div key={coin.coinId}>
              <div className="flex h-auto w-full flex-col rounded-xl bg-gradient-to-r from-[#F2F3E2] to-[#B9E0EE] dark:from-[#43434B] dark:to-[#110744] lg:h-72 lg:flex-row">
                <div className="flex w-full flex-row items-center justify-center gap-4 bg-light-lightBg p-6 dark:bg-dark-darkBg lg:w-1/5 lg:flex-col lg:gap-2">
                  <div className="relative h-8 w-8 rounded-md">
                    <Image
                      src={coin.image || "/images/coin-placeholder.png"}
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
                    params={{ id: coin.coinId }}
                    handleDeleteModalDisplay={() =>
                      handleDeleteModalDisplay(coin._id)
                    }
                  />
                  <hr className="bg-light-primary/80"></hr>
                  <CoinHistoryCard
                    date={date}
                    amount={coin.purchaseAmount}
                    params={{ id: coin.coinId }}
                    currentPrice={coin.currentPrice ?? 0}
                    hasProfit={hasProfit || false}
                    openEditForm={() => openEditForm(coin)}
                  />
                </div>
                {deletedCoin && (
                  <DeleteCoinModal
                    handleDeleteModalDisplay={() =>
                      handleDeleteModalDisplay(deletedCoin.coinId)
                    }
                    coinId={deletedCoin._id}
                    name={deletedCoin.name}
                    coinImage={
                      deletedCoin.image ?? "/images/coin-placeholder.png"
                    }
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
