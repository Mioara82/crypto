"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { persistor, makeStore, type AppStore } from "../../lib/store";
import { PersistGate } from "redux-persist/integration/react";
import LoadingCard from "../components/UI-components/Skeleton/Loading";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<LoadingCard />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
