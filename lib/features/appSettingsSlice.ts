import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Currency = "USD" | "EUR" | "GBP" | "JPY" | "CHF";

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
