import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import { Currency } from "@/lib/features/appSettingsSlice";

interface FilteredCurrencyListProps {
  list: CurrencyProps[];
  onCurrencyChange: () => void;
}

interface CurrencyProps {
  id: string;
  name: string;
  symbol: string;
}

const FilteredCurrencyList: React.FC<FilteredCurrencyListProps> = ({
  list,
  onCurrencyChange,
}) => {
  return list.map((item: CurrencyProps) => (
    <li
      className="flex items-center m-0 gap-2 px-4 py-2 bg-light-lightBg dark:bg-dark-191 last:rounded-b-xl"
      key={item.id}
      onClick={() => onCurrencyChange(item.name as Currency)}
    >
      <span className="bg-light-secondaryTextColor dark:bg-dark-text w-6 h-6 flex items-center justify-center p-1 rounded-full">
        {item.symbol.startsWith("https://") ? (
          <Image width={20} height={20} src={item.symbol} alt={item.name} />
        ) : (
          <span className="mx-auto text-light-lightBg dark:text-dark-textDark m-0">
            {item.symbol}
          </span>
        )}
      </span>
      <span className="text-sm text-light-secondaryTextColor dark:text-dark-text/[80]">
        {item.name}
      </span>
      <FiChevronDown />
    </li>
  ));
};

export default FilteredCurrencyList;
