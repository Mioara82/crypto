import { useState, useEffect, useRef } from "react";

export function useIsActive(defaultValue: number | null) {
  const [isActive, setIsActive] = useState<number | null>(defaultValue);
  const isActiveFirst = useRef(true);
  useEffect(() => {
    if (isActiveFirst.current) {
      setIsActive(defaultValue);
    }
    isActiveFirst.current = false;
  }, [defaultValue]);
  return [isActive, setIsActive] as const;
}
