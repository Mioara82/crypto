import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createConvexEndpoint } from "./createConvexEndpoint";
import type {
  ConvexQueryArgs,
  ChartDataArgs,
  CoinsTableDetailsArgs,
  HistoricalCoinDataArgs,
  SearchDataArgs,
} from "./createConvexEndpoint";
import type {
  MarketData,
  CoinDetailsProps,
  ChartDetails,
  CoinsTableDetails,
  CoinHistoryData,
  PortfolioCoinProps,
} from "./types/apiInterfaces";

export const api: any = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: [
    "MarketData",
    "CoinSearch",
    "CoinDetails",
    "CoinsTableDetails",
    "ChartData",
  ],
  keepUnusedDataFor: 600,
  refetchOnMountOrArgChange: 600,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  endpoints: (builder) => ({
    getSearchData: builder.query<any, SearchDataArgs>({
      ...createConvexEndpoint("CoinSearch", {
        keepUnusedDataFor: 300,
        providesTags: (result, error, { currency }) => [
          { type: "SearchData", id: `${currency}` },
        ],
      }),
    }),
    getMarketData: builder.query<any, ConvexQueryArgs>({
      ...createConvexEndpoint("MarketData", {
        keepUnusedDataFor: 300,
        transformResponse: (response: MarketData) => {
          if (!response || typeof response !== "object") {
            throw new Error("Invalid response structure from CoinGecko API");
          }

          // const data = response.data;

          // if (!data) {
          //   throw new Error("No data property found in response");
          // }

          return {
            coinData: response.active_cryptocurrencies || 0,
            exchange: response.markets || 0,
            totalMarketCap:  response.total_market_cap || {},
            totalVolumePerCurrency:  response.total_volume || {},
            btcMarketCapPercentage: response.market_cap_percentage?.btc || 0,
            ethMarketCapPercentage: response.market_cap_percentage?.eth || 0,
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
        providesTags: (
          result,
          error,
          { currency, currentPage, coinsPerPage, sortQuery },
        ) => [
          {
            type: "CoinsTableDetails",
            id: `${currency}-${currentPage}-${coinsPerPage}-${sortQuery}`,
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
