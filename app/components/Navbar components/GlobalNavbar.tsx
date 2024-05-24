"use client";

import StoreProvider from "../../providers/StoreProvider";
import MarketData from "./NavbarComponents/TopNavbar/globalData/marketData";
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
