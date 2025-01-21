import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import { Currency } from "@/lib/features/currencySlice";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

interface FilteredCurrencyListProps {
  list: CurrencyProps[];
  //type any as I have an error in deployment "type defined but never used"
  onCurrencyChange: any;
}

export interface CurrencyProps {
  id: string;
  name: string;
  symbol: string;
}

const FilteredCurrencyList: React.FC<FilteredCurrencyListProps> = ({
  list,
  onCurrencyChange,
}) => {
  const isMobile = useIsMobile();
  return list.map((item: CurrencyProps) => (
    <li
      className="m-0 py-2 flex justify-center bg-light-lightBg last:rounded-b-xl dark:bg-dark-191 md:gap-2 md:py-2"
      key={item.id}
      onClick={() => {
        onCurrencyChange(item.name as Currency);
      }}
    >
      {isMobile ? null : (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-light-secondaryTextColor p-1 dark:bg-dark-text">
          {item.symbol.startsWith("https://") ? (
            <Image width={20} height={20} src={item.symbol} alt={item.name} />
          ) : (
            <span className="m-0 mx-auto text-light-lightBg dark:text-dark-textDark">
              {item.symbol}
            </span>
          )}
        </span>
      )}
      <span className="text-xs md:text-sm text-light-secondaryTextColor dark:text-dark-text/[80]">
        {item.name}
      </span>
      {isMobile ? null : <FiChevronDown />}
    </li>
  ));
};

export default FilteredCurrencyList;
