import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMarketData = createAsyncThunk(
    "market/fetchData",
    async () => {
        try {
            const response = await fetch(
              "https://api.coingecko.com/api/v3/global/"
            );
            if(!response.ok){
              const err = await response.json();
              throw new Error(err.message);
            }
            return await response.json();
          } catch (error) {
            return (error);
          }
    }
);

const marketSlice = createSlice({
    name: "market",
    initialState: {
        data: null,
        loading: "idle",
        error: null,
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

export default marketSlice.reducer;