import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {api} from "./api";
import marketReducer from "./features/marketSlice";
import currencyReducer from "./features/appSettingsSlice";

// const reduxLogger = require("redux-logger");
// const logger  =reduxLogger.createLogger();

export const rootReducer = combineReducers({
  [api.reducerPath]:api.reducer,
  market: marketReducer,
  currency:currencyReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];