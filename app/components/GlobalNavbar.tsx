"use client";

import StoreProvider from "../providers/StoreProvider";
import MarketData from "./marketData/marketData";
import Navbar from "./NavbarComponents/mainNavbar";

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
