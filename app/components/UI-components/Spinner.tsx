import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

function Spinner() {
  return (
    <div className="w-24 m-auto block">
      <PuffLoader color="#6d48c7" size={40} />
    </div>
  );
}

export default Spinner;
