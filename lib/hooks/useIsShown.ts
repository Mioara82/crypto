import { useState } from "react";

export function useIsShown() {
  const [show, setShow] = useState<boolean>(false);
  const handleIsShown = () => {
    setShow((prev) => !prev);
  };
  return [show, handleIsShown] as const;
}
