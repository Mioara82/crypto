import { createSlice} from "@reduxjs/toolkit";

export interface CoinProps {
  id: string;
  name: string;
}
export interface HistoricDataProps {
  purchasedDate: string;
  purchaseAmount: number;
}

export interface PortfolioCoinData {
  CoinProps?: CoinProps;
  historicData?: HistoricDataProps;
}
interface PortfolioCoinsData {
  portfolioCoins: {
    [key: string]: PortfolioCoinData;
  };
}

const initialState: PortfolioCoinsData = {
  portfolioCoins: {},
};

const portfolioCoins = createSlice({
  name: "portfolioCoinsSlice",
  initialState,
  reducers: {
    addPortfolioCoin(state, action) {
      const {
        id,
        name,
      } = action.payload;
      state.portfolioCoins[name] = {
        ...state.portfolioCoins[name],
        CoinProps: {
          id: id || "",
          name: name || "",
        },
      };
    },
    addHistoricData(state, action) {
      const { name, purchaseAmount, purchasedDate} =
        action.payload;
      state.portfolioCoins[name] = {
        ...state.portfolioCoins[name],
        historicData: {
          purchasedDate: purchasedDate || "",
          purchaseAmount: purchaseAmount || 0,
        },
      };
    },
    deletePortfolioCoin(state, action) {
      const { name } = action.payload;
      if (name) {
        if (state.portfolioCoins[name]) {
          delete state.portfolioCoins[name];
        }
      }
    },
  },
});

export const { addPortfolioCoin,addHistoricData, deletePortfolioCoin } = portfolioCoins.actions;
export default portfolioCoins.reducer;
