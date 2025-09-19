"use client";
import React, { useState } from "react";
import { lazy, Suspense } from "react";
import { useIsShown } from "@/lib/hooks/useIsShown";
import { useStoreUserEffect } from "@/lib/hooks/useStoreUserEffects";
import AddAssetModal from "../components/blocks-components/Portfolio/AddAssetModal";
import Button from "../components/UI-components/Button";
import AssetCoinsSkeleton from "../components/blocks-components/Portfolio/AssetCoinsSkeleton";
//import InvestmentCalculator from "../components/blocks-components/Portfolio/InvestmentCalculator";
import type { Doc } from "@/convex/_generated/dataModel";

const AssetCoins = lazy(
  () => import("../components/blocks-components/Portfolio/AssetCoins"),
);

type PortfolioCoin = Doc<"portfolioCoins">;

const Portfolio = () => {
  const [show, handleIsShown] = useIsShown();
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [editingCoin, setIsEditingCoin] = useState<PortfolioCoin | null>(null);
  //const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);

  const openAddForm = () => {
    setMode("add");
    setIsEditingCoin(null);
    handleIsShown();
  };

  const openEditForm = (coin: PortfolioCoin) => {
    setMode("edit");
    setIsEditingCoin(coin);
    handleIsShown();
  };

  // const handleCalculatorDisplay = () => {
  //   setIsCalculatorOpen((prev) => !prev);
  // };

  const { isLoading, isAuthenticated, userId } = useStoreUserEffect();

  if (isLoading) {
    return (
      <div className="relative">
        <main className="relative flex min-h-screen flex-col p-4 sm:p-8 md:p-24">
          {/* Statistics header skeleton */}
          <div className="mb-6 h-4 w-32 animate-pulse rounded bg-skeleton100 lg:h-5 lg:w-36"></div>
          
          {/* Button section skeleton */}
          <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
            <div className="m-auto flex items-center justify-around gap-3">
              {/* Add asset button skeleton */}
              <div className="h-10 w-24 animate-pulse rounded bg-skeleton100 lg:h-12 lg:w-28"></div>
            </div>
          </div>
          
          {/* Asset coins skeleton */}
          <div className="flex justify-center">
            <AssetCoinsSkeleton />
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">Please log in to view your portfolio.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <main
        className={`relative flex min-h-screen flex-col p-4 sm:p-8 md:p-24 ${
          show ? "z-0 blur-sm" : "blur-none"
        }`}
      >
        <p className="mb-6 text-sm lg:text-base">Your statistics</p>
        <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
          <div className="m-auto flex items-center justify-around gap-3">
            {/* <Button
              text="Investments Calculator"
              feature="large"
              onButtonClick={handleCalculatorDisplay}
            /> */}
            <Button
              text="Add asset"
              feature="large"
              onButtonClick={openAddForm}
            />
          </div>
        </div>
        <div className="flex justify-center">
          {userId && (
            <Suspense fallback={<AssetCoinsSkeleton />}>
              <AssetCoins openEditForm={openEditForm} userId={userId} />
            </Suspense>
          )}
        </div>
      </main>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <AddAssetModal
            mode={mode}
            handleModalDisplay={handleIsShown}
            editingCoin={editingCoin}
          />
        </div>
      )}
      {/* {isCalculatorOpen && (
        <InvestmentCalculator
          handleCalculatorDisplay={handleCalculatorDisplay}
        />
      )} */}
    </div>
  );
};

export default Portfolio;
