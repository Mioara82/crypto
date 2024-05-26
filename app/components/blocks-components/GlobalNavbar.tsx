"use client";

import StoreProvider from "../../providers/StoreProvider";
import MarketData from "./marketData";
import Navbar from "./mainNavbar";

const GlobalNavbar = () => {
  return (
    <>
      <StoreProvider>
        <MarketData />
        <Navbar />
      </StoreProvider>
    </>
  );
};

export default GlobalNavbar;
