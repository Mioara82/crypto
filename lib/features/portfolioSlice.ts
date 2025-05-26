import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface PortfolioCoin {
  id: string;
  image: string;
  name: string;
  symbol: string;
  currentPrice: number;
  purchasedDate?: string;
  purchaseAmount?: number;
}

export interface PortfolioCoinsState {
  portfolioCoins: PortfolioCoin[];
}

const initialState: PortfolioCoinsState = {
  portfolioCoins: [],
};
const portfolioSlice = createSlice({
  name: "portfolioCoins",
  initialState,
  reducers: {
    addCoin(state, action: PayloadAction<PortfolioCoin>) {
      state.portfolioCoins.push(action.payload);
    },
    removeCoin(state, action: PayloadAction<string>) {
      state.portfolioCoins = state.portfolioCoins.filter(
        (coin:PortfolioCoin) => coin.id !== action.payload,
      );
    },
    updateCoin(state, action: PayloadAction<PortfolioCoin>) {
      const index = state.portfolioCoins.findIndex(
        (coin:PortfolioCoin) => coin.id === action.payload.id,
      );
      if (index !== -1) {
        state.portfolioCoins[index] = {
          ...state.portfolioCoins[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { addCoin, removeCoin, updateCoin } = portfolioSlice.actions;

export default portfolioSlice.reducer;
