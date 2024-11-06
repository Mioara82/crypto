import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chartFilter } from "@/app/utils/chartFilter";
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
    id: "",
    symbol: "",
    name: "",
    image: "",
    current_price: 0,
  },
  coinTwo: {
    id: "",
    symbol: "",
    name: "",
    image: "",
    current_price: 0,
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
    handleSelectedFilter(state, action: PayloadAction<daysObject>) {
      const { id } = action.payload;
      const found = chartFilter.find((filter) => filter.id === id);
      if (found) {
        state.selectedFilter = found;
      }
    },
  },
});

export const { setCoinOne, setCoinTwo, handleSelectedFilter } =
  converterSlice.actions;
export default converterSlice.reducer;
