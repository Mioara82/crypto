import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Currency = "USD" | "EUR" | "GBP" | "JPY" | "CHF" | "BTC" | "ETH";

interface CurrencyState {
  currencyName: Currency;
  symbol: string;
}

export const getCurrencySymbol = (currency: Currency): string => {
  const symbols: Record<Currency, string> = {
    USD: "﹩",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CHF: "Fr",
    BTC: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    ETH: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
  };
  return symbols[currency];
};

const initialState: CurrencyState = {
  currencyName: "GBP",
  symbol: getCurrencySymbol("GBP"),
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currencyName = action.payload;
      state.symbol = getCurrencySymbol(action.payload);
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
