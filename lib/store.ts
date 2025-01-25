import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { api } from "./api";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import converterReducer from "./features/converterSlice";
import currencyReducer from "./features/currencySlice";
import chartCoinsReducer from "./features/coinSlice";
import portfolioSliceReducer from "./features/portfolioSlice";

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const persistConfig = {
  key: "root",
  storage,
  version: 2,
};

export const rootReducer: any = combineReducers({
  [api.reducerPath]: api.reducer,
  currency: currencyReducer,
  converter: converterReducer,
  chartCoins: chartCoinsReducer,
  portfolioSlice: portfolioSliceReducer,
});

export const makeStore = () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store: any = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck:false,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware, logger),
  });
  store.persistor = persistStore(store);
  return store;
};

export const persistor = persistStore(makeStore());
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStore,
  unknown,
  Action<string>
>;
