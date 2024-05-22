import { useEffect, RefObject } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./store";

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
