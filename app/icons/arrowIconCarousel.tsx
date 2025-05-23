import React from "react";

interface ArrowIconProps {
  isPositive: boolean;
}

const ArrowIconCarousel: React.FC<ArrowIconProps> = ({ isPositive }) => (
  <svg
    className={`w-3 self-center md:w-4 ${
      isPositive ? "rotate-0 fill-[#077E77]" : "rotate-180 fill-[#FE2264]"
    }`}
    width="16"
    height="12"
    viewBox="0 0 8 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.00065 0.333496L0.667318 3.66683L7.33398 3.66683L4.00065 0.333496Z" />
  </svg>
);

export default ArrowIconCarousel;
