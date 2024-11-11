import React from "react";
import {v4 as uuidv4} from "uuid";

const coinSkeletonArray = Array.from({length:6},()=>({
  name:"coin",
  id:uuidv4()
}));

const CarouselSkeleton = () => {
  return (
    <ul className="w-full h-20 flex gap-2 p-3">
      {coinSkeletonArray.map((coin) => (
        <li
          key={coin.id}
          className="w-[252px] h-20 rounded-md bg-[#76889340]"
        ></li>
      ))}
    </ul>
  );
};

export default CarouselSkeleton;
