import Image from "next/image";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
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
  const isMobile = useIsMobile();
  return (
    <div
      className={`w-20 border-1 border-white/[.05] flex items-center gap-2 ${
        show ? "rounded-t-xl" : "rounded-xl"
      } bg-light-lightBg px-4 py-2 dark:bg-dark-191`}
    >
      {isMobile ? null :(
        <span className="m-0 flex h-6 w-6 items-center justify-center rounded-full bg-light-secondaryTextColor p-1 dark:bg-dark-text">
          {currencySymbol.startsWith("https://") ? (
            <Image width={24} height={24} src={currencySymbol} alt={currency} />
          ) : (
            <span className="m-0 mx-auto text-light-lightBg dark:text-dark-textDark">
              {currencySymbol}
            </span>
          )}
        </span>
      )}
      <span className="m-0 text-xs md:text-sm text-light-secondaryTextColor dark:text-dark-text/[80]">
        {currency}
      </span>
      <FiChevronDown />
    </div>
  );
};

export default CurrencyDetails;
