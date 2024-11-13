import React from "react";
import Link from "next/link";
import Button from "./Button";
import { useIsActive } from "@/lib/hooks/useIsActive";

const ButtonGroup = React.memo(function ButtonGroup() {
  const [isActive, setIsActive] = useIsActive(0);
  const handleActiveButton = (value: number) => {
    setIsActive((prev) => (prev === value ? null : value));
  };
  return (
    <div className="flex justify-start w-[506px] h-[53px] rounded-md p-1">
      <Link href="/" passHref>
        <Button
          text="Coins"
          isActive={isActive === 0}
          onButtonClick={() => handleActiveButton(0)}
          feature="nav"
        />
      </Link>
      <Link href="/Converter" passHref>
        <Button
          text="Converter"
          isActive={isActive === 1}
          onButtonClick={() => handleActiveButton(1)}
          feature="nav"
        />
      </Link>
    </div>
  );
});

export default ButtonGroup;
