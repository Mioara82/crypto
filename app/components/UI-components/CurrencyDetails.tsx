import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";

interface CurrencyDetailsProps {
  currency: string;
  currencySymbol: string;
  show: boolean;
}

const CurrencyDetails: React.FC<CurrencyDetailsProps> = ({
  currency,
  currencySymbol,
  show,
}) => {
  return (
    <div
      className={`flex items-center gap-2 border-1 border-white/[.05] ${
        show ? "rounded-t-xl" : "rounded-xl"
      } px-4 py-2 bg-light-lightBg dark:bg-dark-191`}
    >
      <span className="bg-light-secondaryTextColor dark:bg-dark-text w-6 h-6 m-0 flex items-center justify-center p-1 rounded-full">
        {currencySymbol.startsWith("https://") ? (
          <Image width={24} height={24} src={currencySymbol} alt={currency} />
        ) : (
          <span className="mx-auto text-light-lightBg dark:text-dark-textDark m-0">
            {currencySymbol}
          </span>
        )}
      </span>
      <span className="text-sm text-light-secondaryTextColor dark:text-dark-text/[80] m-0">
        {currency}
      </span>
      <FiChevronDown />
    </div>
  );
};

export default CurrencyDetails;