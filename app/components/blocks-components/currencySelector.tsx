"use-client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { currencyList } from "../UI-components/currencyList";
import { setCurrency, Currency } from "@/lib/features/appSettingsSlice";
import CurrencyDetails from "../UI-components/CurrencyDetails";
import FilteredCurrencyList from "../UI-components/FilteredCurrencyList";

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
    closeDropdown();
  };

  useClickOutside(ref, closeDropdown);

  const filteredCurrencyList = currencyList.filter(
    (item) => item.name !== currency
  );

  return (
    <div
      ref={ref}
      className="flex-col relative w-[108px] gap-2 z-40"
      onClick={handleDropdownDisplay}
    >
      {currencyList && (
        <CurrencyDetails
          show={show}
          currency={currency}
          currencySymbol={currencySymbol}
        />
      )}
      <motion.ul
        animate={show ? "open" : "closed"}
        variants={variants}
        className="absolute top-[40px] w-[108px]"
      >
        {show && (
          <FilteredCurrencyList
            list={filteredCurrencyList}
            onCurrencyChange={handleCurrencyChange}
          />
        )}
      </motion.ul>
    </div>
  );
};

export default CurrencySelector;
