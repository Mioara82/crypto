import React, { useState, useRef } from "react";
import { Suspense } from "react";
import Spinner from "../../UI-components/Spinner";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { CoinSearchProps } from "@/lib/types/apiInterfaces";

const SearchCoin = ({
  list,
  coin,
  handleSelectedCoin,
}: {
  list: CoinSearchProps[] | [];
  coin: CoinSearchProps | undefined;
  handleSelectedCoin: any;
}) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const hideDropdown = () => {
    setShow(false);
  };

  const handleDropdownDisplay = () => {
    setShow(false);
  };

  const handleCoinSearch = (id:string) => {
    hideDropdown();
    handleSelectedCoin(id);
  };

  useClickOutside(ref, handleDropdownDisplay);
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-3 gap-2">
          <Spinner />
          <p>Loading data, please wait...</p>
        </div>
      }
    >
      <div>
        {coin && (
          <p>
            {coin.image} {coin.name} ({coin.symbol})
          </p>
        )}

        {show && (
          <ul ref={ref}>
            {list.map((c) => (
              <li
                key={c.id}
                onClick={() => handleCoinSearch(c.id)}
              >
                {c.image} {c.name} ({c.symbol})
              </li>
            ))}
          </ul>
        )}
      </div>
    </Suspense>
  );
};

export default SearchCoin;
