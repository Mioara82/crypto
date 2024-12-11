"use client";
import React, { useState } from "react";
import { lazy } from "react";
import { useIsShown } from "@/lib/hooks/useIsShown";
import AddAssetModal from "../components/blocks-components/Portfolio/AddAssetModal";
import Button from "../components/UI-components/Button";

const AssetCoins = lazy(
  () => import("../components/blocks-components/Portfolio/AssetCoins"),
);

const Portfolio = () => {
  const [show, handleIsShown] = useIsShown();
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [editingCoinId, setIsEditingCoinId] = useState<string | null>(null);

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

  return (
    <div className="relative">
      <main
        className={`relative flex min-h-screen flex-col p-24 ${
          show ? "z-0 blur-md" : "blur-none"
        }`}
      >
        <div className="mb-6 flex justify-between">
          <p>Your statistics</p>
          <Button
            text="Add asset"
            feature="large"
            onButtonClick={openAddForm}
          />
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
    </div>
  );
};

export default Portfolio;
