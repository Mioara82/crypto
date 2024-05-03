import { AppStore } from "./store";

export interface MarketData {
  coinData: number;
  btcMarketCapPercentage: string;
  ethMarketCapPercentage: string;
  totalMarketCap: string;
  totalVolume: number;
  totalVolumePerCurrency: number;
  exchange: number;
}

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
