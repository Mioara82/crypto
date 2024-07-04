export interface MarketDataApi {
  active_cryptocurrencies: number;
  markets: number;
  total_market_cap: { [key: string]: number };
  total_volume: { [key: string]: number };
  market_cap_percentage: { [key: string]: number };
}

export interface CoinSearch {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  description: string;
  image: Image;
  links: Link;
  market_data: MarketData;
}

type ImageURL = string;

interface Image {
  thumb: ImageURL;
  small: ImageURL;
  large: ImageURL;
}

interface Link {
  homepage: string;
}

export interface MarketData {
  current_price: string;
  ath: number;
  atl: number;
  market_cap: number;
  fully_diluted_valuation: number;
  total_volume: number;
  price_change_percentage_24h: number;
  circulating_supply: number;
  max_supply: number;
}

export interface ChartDetails {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}
