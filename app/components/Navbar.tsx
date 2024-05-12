"use client";

import ThemeSwitch from "./ThemeSwitch";
import StoreProvider from "../providers/StoreProvider";
import MarketData from "./NavbarComponents/marketData/marketData";
import CurrencySelector from "./NavbarComponents/currencySelector";

const Navbar = () => {
  return (
    <>
      <StoreProvider>
        <MarketData />
        <CurrencySelector />
      </StoreProvider>
      <ThemeSwitch />
    </>
  );
};

export default Navbar;
