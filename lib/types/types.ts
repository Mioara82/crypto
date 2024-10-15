import { AppStore } from "../store";

export interface MarketData {
  coinData: number;
  btcMarketCapPercentage: string;
  ethMarketCapPercentage: string;
  totalMarketCap: string;
  totalVolume: number;
  totalVolumePerCurrency: number;
  exchange: number;
}

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
}

export interface daysObject {
  name: string;
  period: number | string;
  id: number;
}

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
