"use client";
import React from "react";
import Button from "../components/UI-components/Button";
import AddAssetModal from "../components/blocks-components/Portfolio/AddAssetModal";
import { useIsShown } from "@/lib/hooks/useIsShown";
import AssetCoins from "../components/blocks-components/Portfolio/AssetCoins";

const Portfolio = () => {
  const [show, handleIsShown] = useIsShown();
  return (
    <div className="relative">
      <main
        className={`flex min-h-screen flex-col p-24 relative ${
          show ? "blur-md z-0" : "blur-none"
        }`}
      >
        <Button
          text="Add asset"
          feature="large"
          onButtonClick={handleIsShown}
        />
        <AssetCoins />
      </main>
      {show && <AddAssetModal handleModalDisplay={handleIsShown} />}
    </div>
  );
};

export default Portfolio;
