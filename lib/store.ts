import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from "./api";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import marketReducer from "./features/marketSlice";
import currencyReducer from "./features/appSettingsSlice";

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["currency"],
};

const persistedReducer = persistReducer(persistConfig, currencyReducer);

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  market: marketReducer,
  currency: persistedReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }).concat(api.middleware, logger),
  });
};

const store = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const persistor = persistStore(store);
