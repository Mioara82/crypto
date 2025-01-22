import { useState, useEffect, useLayoutEffect, useRef } from "react";

const useWindowSize = (): number | null => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const timerRef = useRef(0);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  const debounce = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => handleResize(), 500);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => debounce);
    handleResize();
    return () => {
      window.removeEventListener("resize", () => debounce);
    };
  }, []);
  return windowWidth;
};

export const useIsMobile = (breakpoint = 768) => {
  const width = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  //used useLayoutEffect instead of useEffect as this hook allows for DOM measurements and
  //runs synchronously, allowing DOM to be updated before the browser paints
  useLayoutEffect(() => {
    if (width !== null) {
      setIsMobile(width <= breakpoint);
    }
  }, [width, breakpoint]);
  return isMobile;
};
