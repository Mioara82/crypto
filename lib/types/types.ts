import type { AppStore } from "../store";

// export interface MarketDataApi {
//   coinData: number;
//   btcMarketCapPercentage: string;
//   ethMarketCapPercentage: string;
//   totalMarketCap: string;
//   totalVolume: number;
//   totalVolumePerCurrency: number;
//   exchange: number;
// }

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
  sparkline: {
    price:number
  }
}

export interface FormProps {
  coinName: string | "";
  startDate: string | "";
  endDate: string | "";
  interval: number | 0;
  growRate?: number | 0;
  intervalInvestment?: number | 0;
  initialInvestment: number | 0;
}

export interface HistoricData {
  date: string;
  historicPrice: number;
}

export interface CoinConfigProps {
  id: string;
  historicData: HistoricData[];
}

export interface ChartCoin {
  id:string;
  name:string;
  currentPrice:number;
  symbol:string;
}

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
