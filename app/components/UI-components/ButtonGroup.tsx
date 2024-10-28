import React from "react";
import Button from "./Button";

const ButtonGroup = React.memo(function ButtonGroup({
  isActive,
  handleActiveButton,
}: {
  isActive: number | null;
  handleActiveButton: any;
}) {
  return (
    <div className="flex justify-start w-[506px] h-[53px] rounded-md p-1">
      <Button
        text="Coins"
        isActive={isActive === 0}
        onButtonClick={() => handleActiveButton(0)}
        feature="nav"
      />
      <Button
        text="Converter"
        isActive={isActive === 1}
        onButtonClick={() => handleActiveButton(1)}
        feature="nav"
      />
    </div>
  );
});

export default ButtonGroup;