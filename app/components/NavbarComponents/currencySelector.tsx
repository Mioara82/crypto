"use-client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { useLocalState, useClickOutside } from "@/lib/hooks";
import { currencyList } from "./currencyList";
import { getCurrencySymbol } from "@/lib/features/appSettingsSlice";

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
  const [currency, setCurrency] = useLocalState("currency", "usd");
  const ref = useRef(null);

  const handleDropdownDisplay = () => {
    setShow(show === true ? false : true);
  };

  const closeDropdown = () => {
    setShow(false);
  };

  const onCurrencyChange = (value: string) => {
    setCurrency(value);
  };

  useClickOutside(ref, closeDropdown);

  const filteredCurrencyList = currencyList.filter(
    (item) => item.name !== currency
  );

  return (
    <div
      ref={ref}
      className="flex-col relative w-[108px] gap-2"
      onClick={handleDropdownDisplay}
    >
      {currencyList && (
        <div
          className={`flex items-center gap-2 border-1 border-white/[.05] ${
            show ? "rounded-t-xl" : "rounded-xl"
          } px-4 py-2 bg-light-lightBg dark:bg-dark-191`}
        >
          <span className="bg-light-secondaryTextColor dark:bg-dark-text w-6 h-6 m-0 flex items-center justify-center p-1 rounded-full">
            <span className="mx-auto text-light-lightBg dark:text-dark-textDark m-0">
              {getCurrencySymbol(currency)}
            </span>
          </span>
          <span className="text-sm text-light-secondaryTextColor dark:text-dark-text/[80] m-0">
            {currency}
          </span>
          <FiChevronDown />
        </div>
      )}
      <motion.ul
        animate={show ? "open" : "closed"}
        variants={variants}
        className="absolute top-[40px] w-[108px]"
      >
        {show &&
          filteredCurrencyList.map((el) => {
            return (
              <li
                className="flex items-center m-0 gap-2 px-4 py-2 bg-light-lightBg dark:bg-dark-191 last:rounded-b-xl"
                key={el.id}
                onClick={() => onCurrencyChange(el.name)}
              >
                <span className="bg-light-secondaryTextColor dark:bg-dark-text w-6 h-6 flex items-center justify-center p-1 rounded-full">
                  <span className="mx-auto text-light-lightBg dark:text-dark-textDark">
                    {el.symbol}
                  </span>
                </span>
                <span className="text-sm text-light-secondaryTextColor dark:text-dark-text/[80]">
                  {el.name}
                </span>
                <FiChevronDown />
              </li>
            );
          })}
      </motion.ul>
    </div>
  );
};

export default CurrencySelector;
