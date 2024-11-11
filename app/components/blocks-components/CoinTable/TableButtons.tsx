import React from "react";
import { useIsActive } from "@/lib/hooks/useIsActive";
import Button from "../../UI-components/Button";

const TableButtons = ({
  handlePrevPage,
  handleNextPage,
}: {
  handlePrevPage: () => void;
  handleNextPage: () => void;
}) => {
  const [isActive, setIsActive] = useIsActive(0);
  const handleActiveButton = (value: number) => {
    setIsActive((prev) => (prev === value ? null : value));
  };

  return (
    <>
      <Button
        onButtonClick={() => {
          handlePrevPage();
          handleActiveButton(0);
        }}
        text="Previous"
        isActive={isActive === 0}
        feature="table"
      />
      <Button
        onButtonClick={() => {
          handleNextPage();
          handleActiveButton(1);
        }}
        text="Next"
        isActive={isActive === 1}
        feature="table"
      />
    </>
  );
};

export default TableButtons;
