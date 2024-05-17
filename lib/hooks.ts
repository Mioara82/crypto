import { useState, useEffect, RefObject } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./store";

export function useLocalState(key: string, initialValue: string) {
  const isClient = typeof window === "object";
  const storedValue = isClient ? window.localStorage.getItem(key) : null;
  const item = storedValue ? JSON.parse(storedValue) : initialValue;
  const [value, setValue] = useState(item);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isClient) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return [value, setValue];
}

export function useClickOutside(
  ref: RefObject<HTMLDivElement>,
  callback: () => void
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current?.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, callback]);
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
