import { useRef, useEffect } from "react";

export function useInfiniteScroll(cb: () => void) {
  const observerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          cb();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      },
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [cb]);
  return observerRef;
}
