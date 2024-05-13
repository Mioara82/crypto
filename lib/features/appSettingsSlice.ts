import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DollarSign, EuroSign, SterlingSign, BitcoinSign, EthereumSign } from "@/app/icons/currencyIcons";

type Currency = "USD" | "EUR" | "GBP" | "BTC" | "ETH";

type CurrencyState = {
  currency: Currency;
  symbol: JSX.Element;
};

const getCurrencySymbol = (currency: Currency): JSX.Element => {
  const symbols: Record<Currency, () => JSX.Element> = {
    USD: DollarSign,
    EUR: EuroSign,
    GBP: SterlingSign,
    BTC: BitcoinSign,
    ETH: EthereumSign,
  };
  return symbols[currency]();
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
export default currencySlice.reducer;
