import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MarketDataApi } from "./types/apiInterfaces";

const apiKey: string = process.env.COINGECKO_API_KEY || "";
const url = "https://api.coingecko.com/api/v3";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders(headers) {
      headers.set("x-cg-demo-api-key", apiKey);
      return headers;
    },
  }),
  tagTypes: ["MarketDataApi","CoinSearch"],
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
  }),
});

export const { useGetSearchDataQuery, useGetMarketDataQuery } = api;
