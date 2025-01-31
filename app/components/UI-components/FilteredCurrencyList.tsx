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
      className="m-0 flex justify-center bg-light-lightBg py-2 last:rounded-b-xl dark:bg-dark-191 md:gap-2 md:py-2"
      key={item.id}
      onClick={() => {
        onCurrencyChange(item.name as Currency);
      }}
    >
      {isMobile ? null : (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-light-secondaryTextColor p-1 dark:bg-dark-text">
          {item.symbol.startsWith("https://") ? (
            <div className="relative h-5 w-5">
              <Image
                fill
                style={{ objectFit: "contain" }}
                src={item.symbol}
                alt={item.name}
              />
            </div>
          ) : (
            <span className="m-0 mx-auto text-light-lightBg dark:text-dark-textDark">
              {item.symbol}
            </span>
          )}
        </span>
      )}
      <span className="text-xs text-light-secondaryTextColor dark:text-dark-text/[80] md:text-sm">
        {item.name}
      </span>
      {isMobile ? null : <FiChevronDown />}
    </li>
  ));
};

export default FilteredCurrencyList;
