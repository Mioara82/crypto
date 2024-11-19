import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chartFilter } from "@/app/utils/ChartUtils/chartFilter";
import { daysObject } from "../types/types";

export interface ConverterCoinProps {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
}

interface ConverterProps {
  coinOne: ConverterCoinProps;
  coinTwo: ConverterCoinProps;
  selectedFilter: daysObject;
}

const initialState: ConverterProps = {
  coinOne: {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    current_price: 53645,
  },
  coinTwo: {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    current_price: 1928.05,
  },
  selectedFilter: chartFilter[0],
};

const converterSlice = createSlice({
  name: "converterSlice",
  initialState,
  reducers: {
    setCoinOne(state, action: PayloadAction<ConverterCoinProps>) {
      state.coinOne = action.payload;
    },
    setCoinTwo(state, action: PayloadAction<ConverterCoinProps>) {
      state.coinTwo = action.payload;
    },
    handleSelectedFilter(state, action: PayloadAction<{id:number}>) {
      const found = chartFilter.find((filter) => filter.id === action.payload.id);
      if (found) {
        state.selectedFilter = found;
      }
    },
    swapCoins(state){
      const temp = state.coinOne;
      state.coinOne = state.coinTwo;
      state.coinTwo = temp;
    }
  },
});

export const { setCoinOne, setCoinTwo, handleSelectedFilter,swapCoins } =
  converterSlice.actions;
export default converterSlice.reducer;
