"use-client";
import { useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { currencyList } from "../UI-components/currencyList";
import { setCurrency, Currency } from "@/lib/features/currencySlice";
import CurrencyDetails from "../UI-components/CurrencyDetails";
import FilteredCurrencyList from "../UI-components/FilteredCurrencyList";
import Dropdown from "../UI-components/Dropdown";

const CurrencySelector = () => {
  const [show, setShow] = useState(false);
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName
  );
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );
  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const handleDropdownDisplay = () => {
    setShow(show === true ? false : true);
  };

  const closeDropdown = () => {
    setShow(false);
  };

  const handleCurrencyChange = (currency: Currency) => {
    dispatch(setCurrency(currency));
    handleDropdownDisplay();
  };

  useClickOutside(ref, closeDropdown);

  const filteredCurrencyList = currencyList.filter(
    (item) => item.name !== currency
  );

  return (
    <div
    ref={ref}
      className="w-20 flex-col relative md:w-[108px] gap-2 z-40"
      onClick={handleDropdownDisplay}
    >
      {currencyList && (
        <CurrencyDetails
          show={show}
          currency={currency}
          currencySymbol={currencySymbol}
        />
 
      )}
      <Dropdown show={show} ref={ref} feature="currency list">
        {show && (
          <FilteredCurrencyList
            list={filteredCurrencyList}
            onCurrencyChange={handleCurrencyChange}
          />
        )}
      </Dropdown>
    </div>
  );
};

export default CurrencySelector;
