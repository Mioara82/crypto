import { useState, useEffect, useLayoutEffect } from "react";

const useWindowSize = (): number | null => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
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
