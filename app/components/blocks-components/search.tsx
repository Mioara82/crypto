import { Suspense, ChangeEvent, useState, useRef } from "react";
import { useGetSearchDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { RootState } from "@/lib/store";
import FilteredCoinList from "../UI-components/FilteredCoinList";
import Input from "../UI-components/input";
import Spinner from "../UI-components/Spinner";
import NotificationCard from "../UI-components/NotificationCard";
import Dropdown from "../UI-components/Dropdown";
import { CoinSearchProps } from "@/lib/types/apiInterfaces";

const Search = () => {
  const ref = useRef(null);
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName,
  );
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol,
  );

  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue, 700);
  const { currentData, isSuccess, isLoading } = useGetSearchDataQuery(currency);
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
    setSearchValue("");
  };

  useClickOutside(ref, handleDropdownDisplay);

  const filteredCoinsList = coinsList?.filter((coin: CoinSearchProps) =>
    coin.name.toLowerCase().includes(debouncedSearchValue.toLowerCase()),
  );

  return (
    <Suspense
      fallback={
        <div className="flex justify-center gap-2 p-3">
          <Spinner />
          <p>Loading data, please wait...</p>
        </div>
      }
    >
      <div className="z-9999 relative flex items-center justify-center gap-3 font-[Inter] font-normal">
        <Input
          value={searchValue}
          onInputChange={handleChange}
          onInputBlur={handleOnBlur}
          show={show}
          name="searchInput"
          type="text"
          placeholder="Search..."
          className={`border-1 z-50 w-[356px] rounded-md bg-light-lightBg py-2 pl-9 pr-4 text-sm text-light-secondaryTextColor/80 focus:outline-none dark:bg-dark-191 dark:text-dark-chartTextColor ${show ? "rounded-b-none" : "rounded-xl"}`}
        />
        <Dropdown ref={ref} show={show}>
          {isLoading && <Spinner />}
          {isSuccess ? (
            show && (
              <FilteredCoinList
                list={filteredCoinsList}
                onCoinClick={hideDropdown}
                currencySymbol={currencySymbol}
                searchedValue={searchValue}
              />
            )
          ) : (
            <NotificationCard isSuccess={false} text="Error fetching data" />
          )}
        </Dropdown>
      </div>
    </Suspense>
  );
};

export default Search;
