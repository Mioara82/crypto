import React from "react";
export const ArrowIcon = ({
  handleClick,
}: {
  handleClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <>
      <div onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 8 4"
          className="h-4 w-4 pb-2 inline rotate-180 -translate-y-1 cursor-pointer fill-dark-darkText dark:fill-light-primary hover:dark:fill-[#01f1e3] hover:fill-[#01f1e3]"
        >
          <path d="M4 .333.668 3.666h6.667L4.001.333Z"></path>
        </svg>
      </div>
    </>
  );
};
