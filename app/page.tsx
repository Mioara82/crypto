"use client";

import StoreProvider from "./providers/StoreProvider";
import MarketData from "./components/marketData/marketData";

export default function Home() {
  return (
    <StoreProvider>
      <MarketData />
    </StoreProvider>
  );
}
