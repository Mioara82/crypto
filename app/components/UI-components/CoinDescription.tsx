import Link from "next/link";
import Image from "next/image";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { findHighlighted } from "@/app/utils/searchFormatter";

interface CoinDescriptionProps {
  onCoinClick: () => void;
  currencySymbol: string;
  coin: CoinProps;
  searchedValue: string;
}

export interface CoinProps {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const CoinDescription: React.FC<CoinDescriptionProps> = ({
  coin,
  onCoinClick,
  currencySymbol,
  searchedValue,
}) => {
  const isMobile = useIsMobile();
  return (
    <Link
      href={`/CoinDetails/${coin.id}`}
      key={coin.id}
      onClick={onCoinClick}
      className="hover:shadow-gray-400 mb-0.5 flex justify-stretch p-2 font-Inter text-sm transition-all hover:cursor-pointer hover:rounded-md hover:bg-[#CCCCFA] hover:opacity-50 hover:dark:bg-dark-hover"
    >
      <p className="hidden md:block basis-1/6 text-light-secondaryTextColor/80 dark:text-dark-chartTextColor">
        {coin.symbol}
      </p>
      <p className="basis-1/2 text-light-secondaryTextColor/80 dark:text-dark-chartTextColor">
        {findHighlighted(coin.name, searchedValue)}
      </p>
      {isMobile ? null : (
        <div>
          <p className="mr-1 basis-1/6 text-end text-light-secondaryTextColor/80 dark:text-dark-chartTextColor">
            {currencySymbol.startsWith("https://") ? (
              <div className="relative h-5 w-5">
                <Image
                  fill
                  style={{ display: "inline-flex", objectFit: "contain" }}
                  src={currencySymbol}
                  alt="icon of the currency"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <span>{currencySymbol}</span>
            )}
            {Math.round(coin.current_price)}
          </p>
          <p
            className={`basis-1/6 text-end ${
              coin.price_change_percentage_24h < 0
                ? "text-common-red"
                : "text-common-green"
            }`}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      )}
    </Link>
  );
};

export default CoinDescription;
