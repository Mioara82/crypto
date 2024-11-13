import React from "react";

export const ConverterIcon = ({
  handleDirection,
}: {
  handleDirection: () => void;
}) => {
  return (
    <div
      className="cursor-pointer z-10 absolute top-50 left-[49%] rounded-full"
      onClick={handleDirection}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-8 h-8 fill-light-darkBg dark:fill-dark-text"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
        />
      </svg>
    </div>
  );
};
