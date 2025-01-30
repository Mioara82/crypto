import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  MarketDataApi,
  CoinDetailsProps,
  ChartDetails,
  CoinsTableDetails,
  CoinHistoryData,
  PortfolioCoinProps,
} from "./types/apiInterfaces";

const apiKey: string = process.env.COINGECKO_API_KEY || "";
const url = "https://api.coingecko.com/api/v3";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    mode: "cors",
    credentials: "same-origin",
    prepareHeaders(headers) {
      headers.set("x-cg-demo-api-key", apiKey);
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  tagTypes: ["MarketDataApi", "CoinSearch", "CoinDetails", "CoinsTableDetails"],
  endpoints: (builder) => ({
    getSearchData: builder.query({
      query: (currency) => `/coins/markets/?vs_currency=${currency}`,
    }),
    getMarketData: builder.query({
      query: () => "global",
      transformResponse: (response: { data: MarketDataApi }) => {
        return {
          coinData: response.data.active_cryptocurrencies,
          exchange: response.data.markets,
          totalMarketCap: response.data.total_market_cap,
          totalVolumePerCurrency: response.data.total_volume,
          btcMarketCapPercentage: response.data.market_cap_percentage.btc,
          ethMarketCapPercentage: response.data.market_cap_percentage.eth,
        };
      },
    }),
    getCoinData: builder.query({
      query: (id) =>
        `/coins/${id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=true`,
      transformResponse: (response: CoinDetailsProps) => {
        return {
          id: response.id,
          symbol: response.symbol,
          name: response.name,
          description: response.description,
          links: {
            homepage: response.links.homepage[0],
            blockchain_site_2: response.links.blockchain_site[1],
            blockchain_site_3: response.links.blockchain_site[2],
            blockchair: response.links.blockchain_site[3],
          },
          image: response.image,
          currentPrice: response.market_data.current_price,
          profit: response.market_data.price_change_24h,
          ath: response.market_data.ath,
          athDate: response.market_data.ath_date,
          atl: response.market_data.atl,
          atlDate: response.market_data.atl_date,
          marketCap: response.market_data.market_cap,
          marketCapChange: response.market_data.market_cap_change_24h,
          fullyDilutedValuation: response.market_data.fully_diluted_valuation,
          totalVolume: response.market_data.total_volume,
          priceChangePercentage:
            response.market_data.price_change_percentage_24h,
          maxSupply: response.market_data.max_supply,
          circulatingSupply: response.market_data.circulating_supply,
        };
      },
    }),
    getChartData: builder.query({
      query: ({ id, currency, days }) =>
        `/coins/${id}/market_chart/?vs_currency=${currency}&days=${days}`,
      transformResponse: (response: ChartDetails) => {
        if (!response) {
          throw new Error("No data received");
        }
        return {
          prices: response.prices,
          marketCaps: response.market_caps,
          totalVolumes: response.total_volumes,
        };
      },
    }),
    getCoinsTableData: builder.query({
      query: ({ currency, coinsPerPage, currentPage, sortQuery }) =>
        `/coins/markets?vs_currency=${currency}&order=${sortQuery}&per_page=${coinsPerPage}&page=${currentPage}&market_data=true&price_change_percentage=1h%2C24h%2C7d&sparkline=true`,
      transformResponse: (response: CoinsTableDetails[]) => {
        if (!response) {
          throw new Error("No data received");
        }
        return response.map((coin) => ({
          id: coin.id,
          image: coin.image,
          name: coin.name,
          symbol: coin.symbol,
          currentPrice: coin.current_price,
          priceChangePercentage1h: coin.price_change_percentage_1h_in_currency,
          priceChangePercentage24h:
            coin.price_change_percentage_24h_in_currency,
          priceChangePercentage7d: coin.price_change_percentage_7d_in_currency,
          circulatingSupply: coin.circulating_supply,
          totalSupply: coin.total_supply,
          marketCap: coin.market_cap,
          totalVolume: coin.total_volume,
          sparkline: coin.sparkline_in_7d,
        }));
      },
    }),
    getCoinListWithMarketData: builder.query({
      query: ({ currency }) => `coins/markets?vs_currency=${currency}`,
      transformResponse: (response: PortfolioCoinProps[]) => {
        if (!response) {
          throw new Error("No data received");
        }
        return response.map((coin) => ({
          id: coin.id,
          image: coin.image,
          name: coin.name,
          symbol: coin.symbol,
          currentPrice: coin.current_price,
        }));
      },
    }),
    getHistoricalCoinsData: builder.query({
      query: ({ id, date }) =>
        `coins/${id}/history?date=${date}&localization=true`,
      transformResponse: (response: CoinHistoryData) => {
        if (!response) {
          throw new Error("No data received");
        }
        return {
          id: response.id,
          historicPrice: response.market_data.current_price,
        };
      },
    }),
  }),
});

export const {
  useGetSearchDataQuery,
  useGetMarketDataQuery,
  useGetCoinDataQuery,
  useGetChartDataQuery,
  useGetCoinsTableDataQuery,
  useGetCoinListWithMarketDataQuery,
  useGetHistoricalCoinsDataQuery,
} = api;
