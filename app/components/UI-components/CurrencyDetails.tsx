import Image from "next/image";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { FiChevronDown } from "react-icons/fi";

interface CurrencyDetailsProps {
  currency: string;
  currencySymbol: string;
}

const CurrencyDetails: React.FC<CurrencyDetailsProps> = ({
  currency,
  currencySymbol,
}) => {
  const isMobile = useIsMobile();
  return (
    <div data-testid="currency-button"
      className="border-1 border-white/[.05] flex w-full items-center gap-2 bg-light-lightBg px-4 py-2 dark:bg-dark-191 rounded-2xl"
    >
      {isMobile ? null : (
        <span className="m-0 flex h-6 w-6 items-center justify-center rounded-full bg-light-secondaryTextColor p-1 dark:bg-dark-text">
          {currencySymbol.startsWith("https://") ? (
            <div className="relative h-6 w-6">
              <Image
                fill
                style={{ objectFit: "contain" }}
                src={currencySymbol}
                alt={currency}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <span className="m-0 mx-auto text-light-lightBg dark:text-dark-textDark">
              {currencySymbol}
            </span>
          )}
        </span>
      )}
      <span className="m-0 text-xs text-light-secondaryTextColor dark:text-dark-text/[80] md:text-sm">
        {currency}
      </span>
      <FiChevronDown />
    </div>
  );
};

export default CurrencyDetails;
