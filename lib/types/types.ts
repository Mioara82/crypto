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
  period: number;
  id: number;
}

export interface Coin {
  id: string;
  image: string;
  name: string;
  symbol: string;
  currentPrice: number;
  priceChangePercentage1h: number;
  priceChangePercentage24h: number;
  priceChangePercentage7d: number;
  circulatingSupply:number;
  totalSupply:number;
  marketCap:number;
  totalVolume:number;
  sparkline: any;
}

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
