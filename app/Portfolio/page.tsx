"use client";
import React from "react";
import Button from "../components/UI-components/Button";
import AddAssetModal from "./AddAssetModal";
import { useIsShown } from "@/lib/hooks/useIsShown";

const  Portfolio = () => {
  const [show, handleIsShown] = useIsShown();
  return (
    <>
    <main className="flex min-h-screen flex-col p-24 relative">
      <Button text="Add asset" feature="large" onButtonClick={handleIsShown}/>
      {show && <AddAssetModal handleModalDisplay={handleIsShown} />}
    </main>
    </>
  );
};

export default Portfolio;