import { useState, useEffect} from "react";

export function useScrollButtonVisibility() {
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    const pageOffset = window.scrollY;
    const showButtonOnScroll = pageOffset > 1000;
    setShow(showButtonOnScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return show;
}
