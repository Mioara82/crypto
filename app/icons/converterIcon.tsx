import React from "react";
import { BsArrowDownUp } from "react-icons/bs";

export const ConverterIcon = ({
  handleDirection,
}: {
  handleDirection: () => void;
}) => {
  return (
    <div
      className="top-50 absolute left-[48&] z-10 cursor-pointer rounded-full border-[1px] border-light-tableTextColor p-2 text-light-primaryTextColor dark:border-dark-textFocus dark:text-common-brigthBlue"
      onClick={handleDirection}
    >
      <BsArrowDownUp size={30} />
    </div>
  );
};
