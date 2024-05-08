"use client";

import ThemeSwitch from "./ThemeSwitch";
import StoreProvider from "../providers/StoreProvider";
import MarketData from "./marketData/marketData";

const Navbar = () => {
  return (
    <>
      <StoreProvider>
        <MarketData />
      </StoreProvider>
      <ThemeSwitch />
    </>
  );
};

export default Navbar;
