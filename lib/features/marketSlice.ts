import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { formatMarketCap } from "@/app/utils/formatHelpers";
import { MarketData } from "../types/types";

export const fetchMarketData = createAsyncThunk<MarketData>(
  "market/fetchData",
  async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/global/");
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message);
    }
    const responseData = await response.json();
    const marketData: MarketData = {
      coinData: responseData.data.active_cryptocurrencies,
      btcMarketCapPercentage:
        responseData.data.market_cap_percentage.btc.toFixed(0),
      ethMarketCapPercentage:
        responseData.data.market_cap_percentage.eth.toFixed(0),
      totalMarketCap: formatMarketCap(responseData.data.total_market_cap.usd),
      totalVolume: responseData.data.total_volume,
      totalVolumePerCurrency: responseData.data.total_volume.usd,
      exchange: responseData.data.markets,
    };
    return marketData;
  }
);

type errorType = null | undefined | string;

const marketSlice = createSlice({
  name: "market",
  initialState: {
    data: {} as MarketData,
    loading: "idle",
    error: null as errorType,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMarketData.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchMarketData.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.data = action.payload;
    });
    builder.addCase(fetchMarketData.rejected, (state, action) => {
      state.loading = "rejected";
      state.error = action.error?.message;
    });
  },
});

const marketReducer = marketSlice.reducer;
export default marketReducer;
