"use client";
import React, { useState } from "react";
import { lazy } from "react";
import { useIsShown } from "@/lib/hooks/useIsShown";
import AddAssetModal from "../components/blocks-components/Portfolio/AddAssetModal";
import Button from "../components/UI-components/Button";
import InvestmentCalculator from "../components/blocks-components/Portfolio/InvestmentCalculator";

const AssetCoins = lazy(
  () => import("../components/blocks-components/Portfolio/AssetCoins"),
);

const Portfolio = () => {
  const [show, handleIsShown] = useIsShown();
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [editingCoinId, setIsEditingCoinId] = useState<string | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);

  const openAddForm = () => {
    setMode("add");
    setIsEditingCoinId(null);
    handleIsShown();
  };

  const openEditForm = (id: string) => {
    setMode("edit");
    setIsEditingCoinId(id);
    handleIsShown();
  };

  const handleCalculatorDisplay = () => {
   setIsCalculatorOpen(prev => !prev);
  };

  return (
    <div className="relative">
      <main
        className={`relative flex min-h-screen flex-col p-24 ${
          show || isCalculatorOpen ? "z-0 blur-sm" : "blur-none"
        }`}
      >
        <div className="mb-6 flex justify-between">
          <p>Your statistics</p>
          <div>
            <Button
              text="Investments Calculator"
              feature="large"
              onButtonClick={handleCalculatorDisplay}
            />
            <Button
              text="Add asset"
              feature="large"
              onButtonClick={openAddForm}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <AssetCoins openEditForm={openEditForm} />
        </div>
      </main>
      {show && (
        <AddAssetModal
          mode={mode}
          handleModalDisplay={handleIsShown}
          editingCoinId={editingCoinId}
        />
      )}
      {isCalculatorOpen && <InvestmentCalculator handleCalculatorDisplay={handleCalculatorDisplay}/>}
    </div>
  );
};

export default Portfolio;
