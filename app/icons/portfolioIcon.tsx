import React from "react";

const PortfolioIcon = ({ isActive }: { isActive: boolean }) => (

  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 md:w-6 md:h-6"
  >
    <path
      className={` ${isActive ? "stroke-light-darkBg dark:stroke-dark-buttonBorder" : "stroke-light-darkBg dark:stroke-dark-text"}`}
      d="M21 12L12 18L3 12M21 16L12 22L3 16M21 8L12 14L3 8L12 2L21 8Z"
      strokeOpacity="0.5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PortfolioIcon;
