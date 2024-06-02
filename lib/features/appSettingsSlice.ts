import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Currency = "USD" | "EUR" | "GBP" | "JPY" | "CHF" | "BTC" | "ETH";

type CurrencyState = {
  currency: Currency;
  symbol: string;
};

export const getCurrencySymbol = (currency: Currency): string => {
  const symbols: Record<Currency, string> = {
    USD: "﹩",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CHF: "Fr",
    BTC: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    ETH: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628"
  };
  return symbols[currency];
};

const initialState: CurrencyState = {
  currency: "USD",
  symbol: getCurrencySymbol("USD"),
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
      state.symbol = getCurrencySymbol(action.payload);
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export const selectCurrency = (state: any) => state.currency.currency;
export const selectCurrencySymbol = (state: any) => state.currency.symbol;
export default currencySlice.reducer;
