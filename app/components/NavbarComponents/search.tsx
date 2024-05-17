import { ChangeEvent, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useGetSearchDataQuery } from "@/lib/api";
import { useClickOutside, useLocalState } from "@/lib/hooks";
import Input from "../input";
import { CoinSearch } from "@/lib/types/apiInterfaces";

const variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const Search = () => {
  const ref = useRef(null);
  const [currency] = useLocalState("currency", "usd");

  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const { currentData, isLoading } = useGetSearchDataQuery(currency);
  const coinsList = currentData?.slice(0, 30);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    setShow(true);
  };

  const handleOnBlur = () => {
    setSearchValue("");
    setShow(false);
  };

  const handleDropdownDisplay = () => {
    setShow(false);
  };

  useClickOutside(ref, handleDropdownDisplay);

  if (!currentData || isLoading) return;

  const filteredCoinsList = coinsList.filter((coin: CoinSearch) =>
    coin.name.toLowerCase().startsWith(searchValue.toLowerCase())
  );

  return (
    <div className="relative flex items-center justify-center gap-3 font-[Inter] font-normal">
      <Input
        value={searchValue}
        onInputChange={handleChange}
        onInputBlur={handleOnBlur}
        show={show}
        name="searchInput"
        type="text"
        placeholder="Search..."
      />
      <motion.ul
        animate={show ? "open" : "closed"}
        variants={variants}
        ref={ref}
        className={`h-96 w-[100%] pl-9 pr-4 py-2 absolute top-[36px] overflow-auto bg-light-lightBg dark:bg-dark-191 rounded-b-xl ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        {show &&
          filteredCoinsList &&
          filteredCoinsList.map((coin: CoinSearch) => (
            <li
              key={coin.id}
              className="flex justify-stretch mb-0.5 text-sm font-Inter"
            >
              <p className="basis-1/6 text-light-secondaryTextColor/80  dark:text-dark-chartTextColor">
                {coin.symbol}
              </p>
              <p className="basis-1/2 text-light-secondaryTextColor/80  dark:text-dark-chartTextColor">
                {coin.name}
              </p>
              <p className="basis-1/6 text-light-secondaryTextColor/80  dark:text-dark-chartTextColor">
                {Math.round(coin.ath)}
              </p>
              <p
                className={`basis-1/6 justify-self-end ${
                  coin.price_change_percentage_24h < 0
                    ? "text-common-red"
                    : "text-common-green"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </li>
          ))}
      </motion.ul>
    </div>
  );
};

export default Search;
