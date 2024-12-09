export interface MarketDataApi {
  active_cryptocurrencies: number;
  markets: number;
  total_market_cap: { [key: string]: number };
  total_volume: { [key: string]: number };
  market_cap_percentage: { [key: string]: number };
}

export interface CoinSearchProps {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface CoinDetailsProps {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
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
  blockchain_site: string[];
}

export interface MarketData {
  symbol: string;
  current_price: {
    [currency: string]: number;
  };
  profit: number;
  ath: {
    [currency: string]: number;
  };
  ath_date: {
    [currency: string]: Date;
  };
  atl: {
    [currency: string]: number;
  };
  atl_date: {
    [currency: string]: Date;
  };
  market_cap: {
    [currency: string]: number;
  };
  market_cap_change_24h: {
    [currency: string]: number;
  };
  fully_diluted_valuation: {
    [currency: string]: number;
  };
  total_volume: {
    [currency: string]: number;
  };
  price_change_24h: number;
  price_change_percentage_24h: number;
  circulating_supply: number;
  max_supply: number;
}

export interface ChartDetails {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

export interface CoinsTableDetails {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  circulating_supply: number;
  total_supply: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d: {
    price: number;
  };
}

export interface PortfolioCoinProps {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
}

interface HistoryMarketData {
  current_price: {
    [currency: string]: number;
  };
}
export interface CoinHistoryData {
  id: string;
  market_data: HistoryMarketData;
}
