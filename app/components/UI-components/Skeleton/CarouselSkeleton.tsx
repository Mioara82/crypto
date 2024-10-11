import React from "react";

const coinSkeletonArray = Array(6).fill("coin");

const CarouselSkeleton = () => {
  return (
    <ul className="w-full h-20 flex gap-2 p-3">
      {coinSkeletonArray.map((_,index) => (
        <li
          key={index}
          className="w-[252px] h-20 rounded-md bg-[#76889340]"
        ></li>
      ))}
    </ul>
  );
};

export default CarouselSkeleton;
