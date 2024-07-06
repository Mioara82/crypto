import { useState, useEffect } from "react";

export function useMessageBox() {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return isVisible;
}
