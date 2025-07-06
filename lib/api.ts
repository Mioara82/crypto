import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { convex } from "@/convex/client";
import { api as convexApi } from "@/convex/_generated/api";
import { createConvexEndpoint } from "./createConvexEndpoint";
import type {
  ConvexQueryArgs,
  ChartDataArgs,
  CoinsTableDetailsArgs,
  HistoricalCoinDataArgs,
} from "./createConvexEndpoint";
import type {
  MarketDataApi,
  CoinDetailsProps,
  ChartDetails,
  CoinsTableDetails,
  CoinHistoryData,
  PortfolioCoinProps,
} from "./types/apiInterfaces";
import { create } from "domain";

// const apiKey: string = process.env.COINGECKO_API_KEY || "";
// const url = "https://api.coingecko.com/api/v3";

export const api: any = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: [
    "MarketDataApi",
    "CoinSearch",
    "CoinDetails",
    "CoinsTableDetails",
    "ChartData",
  ],
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 300,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getSearchData: builder.query<any, ConvexQueryArgs>({
      ...createConvexEndpoint("CoinSearch", {
        keepUnusedDataFor: 300,
        providesTags: (result, error, arg) => [
          { type: "CoinSearch", id: arg.query.id },
        ],
      }),
    }),
    getMarketData: builder.query<any, ConvexQueryArgs>({
      ...createConvexEndpoint("MarketDataApi", {
        keepUnusedDataFor: 300,
        transformResponse: (response: MarketDataApi) => {
          return {
            coinData: response.active_cryptocurrencies,
            exchange: response.markets,
            totalMarketCap: response.total_market_cap,
            totalVolumePerCurrency: response.total_volume,
            btcMarketCapPercentage: response.market_cap_percentage.btc,
            ethMarketCapPercentage: response.market_cap_percentage.eth,
          };
        },
      }),
    }),
    getCoinData: builder.query<any, ConvexQueryArgs>({
      ...createConvexEndpoint("CoinDetails", {
        keepUnusedDataFor: 600,
        providesTags: (result, error, arg) =>
          [{ type: "CoinDetails", id: arg.query.id || "unknown" }] as const,
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
    }),
    getChartData: builder.query<any, ChartDataArgs>({
      ...createConvexEndpoint("ChartData", {
        keepUnusedDataFor: 180,
        providesTags: (result, error, { id, currency, days }) => [
          { type: "ChartData", id: `${id}-${currency}-${days}` },
        ],
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
    }),
    getCoinsTableData: builder.query<any, CoinsTableDetailsArgs>({
      ...createConvexEndpoint("CoinsTableDetails", {
        keepUnusedDataFor: 600,
        providesTags: (result, error, { currency, currentPage, sortQuery }) => [
          {
            type: "CoinsTableDetails",
            id: `${currency}-${currentPage}-${sortQuery}`,
          },
        ],
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
            priceChangePercentage1h:
              coin.price_change_percentage_1h_in_currency,
            priceChangePercentage24h:
              coin.price_change_percentage_24h_in_currency,
            priceChangePercentage7d:
              coin.price_change_percentage_7d_in_currency,
            circulatingSupply: coin.circulating_supply,
            totalSupply: coin.total_supply,
            marketCap: coin.market_cap,
            totalVolume: coin.total_volume,
            sparkline: coin.sparkline_in_7d,
          }));
        },
      }),
    }),
    getCoinListWithMarketData: builder.query<any, ConvexQueryArgs>({
      ...createConvexEndpoint("CoinSearch", {
        keepUnusedDataFor: 300,
        providesTags: (result, error, arg) => [
          { type: "CoinSearch", id: arg.query.id },
        ],
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
    }),
    getHistoricalCoinsData: builder.query<any, HistoricalCoinDataArgs>({
      ...createConvexEndpoint("CoinDetails", {
        keepUnusedDataFor: 3600,
        providesTags: (result, error, { id, date }) => [
          { type: "CoinDetails", id: `${id}-${date}` },
        ],
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
