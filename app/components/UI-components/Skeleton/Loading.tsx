import React from "react";
import "@/public/loader-squares.css";

const LoadingCard = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-6">
      <div className="loader-squares"></div>
    </div>
  );
};

export default LoadingCard;
