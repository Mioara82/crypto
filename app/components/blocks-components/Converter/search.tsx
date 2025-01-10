import React, { useState, useRef } from "react";
import { Suspense } from "react";
import Image from "next/image";
import Spinner from "../../UI-components/Spinner";
import Dropdown from "../../UI-components/Dropdown";
import { ArrowIcon } from "@/app/icons/arrowIcon";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { CoinSearchProps } from "@/lib/types/apiInterfaces";

const SearchCoin = ({
  list,
  coin,
  handleSelectedCoin,
  direction,
}: {
  list: CoinSearchProps[] | [];
  coin?: CoinSearchProps | undefined;
  //if I pass the id to the handleSelectedCoin it throws an error 'id' is defined but never used.
  handleSelectedCoin: any;
  direction?: string;
}) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const hideDropdown = () => {
    setShow(false);
  };

  const handleDropdownDisplay = () => {
    setShow((prev) => !prev);
  };

  const handleCoinSearch = (id: string) => {
    hideDropdown();
    handleSelectedCoin(id, direction);
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
      <div className="flex gap-4 relative">
        {coin && (
          <div className="flex items-center gap-2">
            <Image
              width={20}
              height={20}
              src={coin.image}
              alt="icon of the coin"
            />
            <div className="text-xl text-light-darkBg dark:text-dark-text">
              {coin.name} ({coin.symbol})
            </div>
          </div>
        )}
        {show ? (
          <Dropdown ref={ref} show={show}>
            {list.map((c) => (
              <li key={c.id} className="flex gap-2 mb-2 items-center cursor-pointer" onClick={() => handleCoinSearch(c.id)}>
                <Image
                  width={14}
                  height={14}
                  src={c.image}
                  alt="icon of the coin"
                />{" "}
                <div>
                  {c.name} ({c.symbol})
                </div>
              </li>
            ))}
          </Dropdown>
        ) : null}
        <ArrowIcon handleClick={handleDropdownDisplay} />
      </div>
    </Suspense>
  );
};

export default SearchCoin;
