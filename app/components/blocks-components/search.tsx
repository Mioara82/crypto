import { Suspense, ChangeEvent, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useGetSearchDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { RootState } from "@/lib/store";
import FilteredCoinList from "../UI-components/FilteredCoinList";
import Input from "../UI-components/input";
import Spinner from "../UI-components/Spinner";
import { CoinSearch } from "@/lib/types/apiInterfaces";

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
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName
  );
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );

  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue, 700);
  const { currentData, isSuccess } = useGetSearchDataQuery(currency);
  const coinsList = currentData.slice(0, 30);

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
    <Suspense
      fallback={
        <div className="flex justify-center p-3 gap-2">
          <Spinner />
          <p>Loading data, please wait...</p>
        </div>
      }
    >
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
          className={`h-96 w-[100%] pl-9 pr-4 py-2 z-20 absolute top-[36px] overflow-auto bg-[#ccccfa] dark:bg-dark-191 rounded-b-xl ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          {isSuccess
            ? show && (
              <FilteredCoinList
                list={filteredCoinsList}
                onCoinClick={hideDropdown}
                currencySymbol={currencySymbol}
              />
            )
            : null}
        </motion.ul>
      </div>
    </Suspense>
  );
};

export default Search;
