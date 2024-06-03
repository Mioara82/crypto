import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from "./api";
import currencyReducer from "./features/appSettingsSlice";

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  currency: currencyReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }).concat(api.middleware,logger),
  });
};

const store = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export default store;