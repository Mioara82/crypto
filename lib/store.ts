import { configureStore, combineReducers } from "@reduxjs/toolkit";
import marketReducer from "./features/marketSlice";
import currencyReducer from "./features/appSettingsSlice";

const reduxLogger = require("redux-logger");
const logger  =reduxLogger.createLogger();

export const rootReducer = combineReducers({
  market: marketReducer,
  currency:currencyReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];