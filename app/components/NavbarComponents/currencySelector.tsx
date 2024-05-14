"use-client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useLocalState } from "@/lib/hooks";
import { currencyList } from "./currencyList";
import { getCurrencySymbol } from "@/lib/features/appSettingsSlice";

const CurrencySelector = () => {
  const [show, setShow] = useState(false);
  const [currency, setCurrency] = useLocalState("currency", "USD");

  const onDisplay = () => {
    setShow(!show);
  };

  const onCurrencyChange = (value: any) => {
    setCurrency(value);
  };

  const filteredCurrencyList = currencyList.filter(
    (item) => item.name !== currency
  );

  return (
    <div className="flex-col relative w-[108px] gap-2" onClick={onDisplay}>
      {currencyList && (
        <div
          className={`flex items-center gap-2 border-1 border-white/[.05] ${
            show ? "rounded-t-xl" : "rounded-xl"
          } px-4 py-2 bg-light-lightBg dark:bg-dark-191`}
        >
          <span className="bg-light-secondaryTextColor dark:bg-dark-text w-6 h-6 m-0 flex items-center justify-center p-1 rounded-full">
            <span className="mx-auto fill-light-lightBg dark:fill-dark-textDark m-0">
              {getCurrencySymbol(currency)}
            </span>
          </span>
          <span className="text-sm text-light-secondaryTextColor dark:text-dark-text/[80] m-0">
            {currency}
          </span>
          <FiChevronDown />
        </div>
      )}
      {show && (
        <div className="absolute top-[40px] w-[108px]">
          {filteredCurrencyList.map((el) => {
            return (
              <div
                className="flex items-center m-0 gap-2 px-4 py-2 bg-light-lightBg dark:bg-dark-191 last:rounded-b-xl"
                key={el.id}
                onClick={() => onCurrencyChange(el.name)}
              >
                <span className="bg-light-secondaryTextColor dark:bg-dark-text w-6 h-6 flex items-center justify-center p-1 rounded-full">
                  <span className="mx-auto fill-light-lightBg dark:fill-dark-textDark">
                    {el.symbol}
                  </span>
                </span>
                <span className="text-sm text-light-secondaryTextColor dark:text-dark-text/[80]">
                  {el.name}
                </span>
                <FiChevronDown />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
