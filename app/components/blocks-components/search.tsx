import { ChangeEvent, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useGetSearchDataQuery } from "@/lib/api";
import { useAppSelector, useClickOutside, useDebounce } from "@/lib/hooks";
import Input from "../UI-components/input";
import Spinner from "../UI-components/Spinner";
import { CoinSearch } from "@/lib/types/apiInterfaces";
import {
  selectCurrency,
  selectCurrencySymbol,
} from "@/lib/features/appSettingsSlice";

const variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const Search = () => {
  const ref = useRef(null);
  const currency = useAppSelector(selectCurrency);
  const currencySymbol = useAppSelector(selectCurrencySymbol);

  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue, 700);
  const { currentData, isLoading, isError } = useGetSearchDataQuery(currency);
  const coinsList = currentData?.slice(0, 30);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    setShow(true);
  };

  const handleOnBlur = () => {
    setSearchValue("");
  };

  const hideDropdown = () => {
    setShow(false);
  };

  const handleDropdownDisplay = () => {
    setShow(false);
  };

  useClickOutside(ref, handleDropdownDisplay);

  const filteredCoinsList = coinsList?.filter((coin: CoinSearch) =>
    coin.name.toLowerCase().startsWith(debouncedSearchValue.toLowerCase())
  );

  return (
    <div className="relative flex items-center justify-center gap-3 font-[Inter] font-normal">
      {isLoading ? (
        <Spinner />
      ) : (
        <Input
          value={searchValue}
          onInputChange={handleChange}
          onInputBlur={handleOnBlur}
          show={show}
          name="searchInput"
          type="text"
          placeholder="Search..."
        />
      )}
      <motion.ul
        animate={show ? "open" : "closed"}
        variants={variants}
        ref={ref}
        className={`h-96 w-[100%] pl-9 pr-4 py-2 absolute top-[36px] overflow-auto bg-light-lightBg dark:bg-dark-191 rounded-b-xl ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        {isError && <div>An error occurred, please wait...</div>}
        {isLoading && (
          <div>
            <Spinner />
            <p>Loading data, please wait...</p>
          </div>
        )}
        {show &&
          filteredCoinsList &&
          filteredCoinsList.map((coin: CoinSearch) => (
            <Link
              href={`/Coin/${coin.id}`}
              onClick={hideDropdown}
              key={coin.id}
              className="flex justify-stretch p-2 mb-0.5 text-sm font-Inter hover:cursor-pointer hover:bg-[#CCCCFA] hover:dark:bg-dark-hover hover:shadow-gray-400 hover:opacity-50 hover:rounded-md transition-all dura"
            >
              <p className="basis-1/6 text-light-secondaryTextColor/80  dark:text-dark-chartTextColor">
                {coin.symbol}
              </p>
              <p className="basis-1/2 text-light-secondaryTextColor/80  dark:text-dark-chartTextColor">
                {coin.name}
              </p>
              <p className="basis-1/6 text-light-secondaryTextColor/80  dark:text-dark-chartTextColor text-end mr-1">
                {currencySymbol.startsWith("https://") ? (
                  <Image
                    width={20}
                    height={20}
                    src={currencySymbol}
                    alt="icon of the currency"
                    style={{ display: "inline-flex" }}
                  />
                ) : (
                  <span>{currencySymbol}</span>
                )}
                {Math.round(coin.current_price)}
              </p>
              <p
                className={`basis-1/6 text-end ${
                  coin.price_change_percentage_24h < 0
                    ? "text-common-red"
                    : "text-common-green"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </Link>
          ))}
      </motion.ul>
    </div>
  );
};

export default Search;
