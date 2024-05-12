"use-client";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { FiChevronDown } from "react-icons/fi";
import { useLocalState } from "@/lib/hooks";
import { currencyList } from "./currencyList";

const CurrencySelector = () => {
  const [show, setShow] = useState(false);
  const [currency, setCurrency] = useLocalState("currency", "USD");
  const { symbol } = useAppSelector((state: RootState) => state.currency);

  const onDisplay = () => {
    setShow(!show);
  };

  const onCurrencyChange = (value: any) => {
    setCurrency(value);
  };

  const filteredCurrencyList = currencyList.filter(item => item.name !== currency);

  return (
    <div className="flex-col w-[108px]" onClick={onDisplay}>
      {currencyList && (
        <button className="flex items-center gap-2 border border-white/[.05] rounded-md px-4 py-3 bg-light-lightBg dark:bg-dark-191">
          <span className="bg-light-secondaryTextColor dark:bg-dark-text w-6 h-6 flex items-center justify-center p-1 rounded-full">
            <span className="mx-auto fill-light-lightBg dark:fill-dark-textDark">{symbol}</span>
          </span>
          <span className="text-sm text-light-secondaryTextColor dark:text-dark-text/[80]">
            {currency}
          </span>
          <FiChevronDown />
        </button>
      )}
      {show &&
        filteredCurrencyList.map((el) => {
          return (
            <button
              className="flex items-center gap-2 rounded-md px-4 py-3 bg-light-lightBg dark:bg-dark-191"
              key={el.id}
              onClick={() => onCurrencyChange(el.name)}
            >
              <span className="bg-light-secondaryTextColor dark:bg-dark-text w-6 h-6 flex items-center justify-center p-1 rounded-full">
                <span className="mx-auto fill-light-lightBg dark:fill-dark-textDark">{el.symbol}</span>
              </span>
              <span className="text-sm text-light-secondaryTextColor dark:text-dark-text/[80]">
                {el.name}
              </span>
              <FiChevronDown />
            </button>
          );
        })}
    </div>
  );
};

export default CurrencySelector;
