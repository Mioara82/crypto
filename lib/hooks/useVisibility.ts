import { useState, useEffect } from "react";

export function useVisibility() {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return isVisible;
}
