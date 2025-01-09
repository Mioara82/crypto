import { createSlice } from "@reduxjs/toolkit";

export interface ChartCoinData {
  id: string;
  symbol: string;
  currentPrice: number;
}

interface ChartCoins {
  chartCoins: {
    [key: string]: ChartCoinData;
  };
}

const initialState: ChartCoins = {
  chartCoins: {
    bitcoin: {
      id: "bitcoin",
      symbol: "btc",
      currentPrice: 45000,
    },
  },
};

const chartCoins = createSlice({
  name: "selectedChartCoinSlice",
  initialState,
  reducers: {
    handleChartCoin(state, action) {
      const { name, id, symbol, current_price } = action.payload;
      if (name) {
        const nameLowercased = name.toLowerCase();
        if (
          state.chartCoins[nameLowercased] &&
          Object.keys(state.chartCoins).length > 1
        ) {
          delete state.chartCoins[nameLowercased];
        } else if (Object.keys(state.chartCoins).length < 2) {
          state.chartCoins[nameLowercased] = {
            id: id || "",
            symbol: symbol.toUpperCase() || "",
            currentPrice: current_price || 0,
          };
        }
      }
    },
    deleteChartCoin(state, action) {
      const { name } = action.payload;
      if (name && Object.keys(state.chartCoins).length > 1) {
        const nameLowercased = name.toLowerCase();
        delete state.chartCoins[nameLowercased];
      }
    },
  },
});

export const { handleChartCoin, deleteChartCoin } = chartCoins.actions;
export default chartCoins.reducer;
