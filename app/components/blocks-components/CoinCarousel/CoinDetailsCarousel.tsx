import Image from "next/image";
import ArrowIconCarousel from "@/app/icons/arrowIconCarousel";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { roundTo4Decimals } from "@/app/utils/formatHelpers";

export interface CoinProps {
  image: string;
  id: string;
  current_price: number;
  price_change_percentage_24h: number;
  symbol: string;
  name: string;
}

export interface CoinDetailProps {
  coin: CoinProps;
  isActive: boolean;
  currency: string;
  handleSelectedCoin: () => void;
}

const CoinDetail: React.FC<CoinDetailProps> = ({
  coin,
  currency,
  isActive,
  handleSelectedCoin,
}) => {
  const isPositive = coin.price_change_percentage_24h > 0;
  const isMobile = useIsMobile();
  return (
    <div
      className={`flex w-20 cursor-pointer items-center justify-center gap-4 rounded-md p-2 sm:m-0 xs:w-28 sm:w-48 md:w-52 ${
        isActive ? "bg-common-purple" : "bg-light-primary dark:bg-dark-191"
      }`}
      onClick={handleSelectedCoin}
    >
      <div className="relative h-8 w-8 md:h-10 md:w-10">
        <Image
          fill
          style={{ objectFit: "contain" }}
          src={coin.image}
          alt="coin image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="w-full md:w-5/6 flex flex-col justify-start">
        <div
          className={`flex gap-2 text-xs sm:text-sm items-center ${
            isActive
              ? "text-light-primary dark:text-dark-text"
              : "text-light-primaryTextColor dark:text-dark-text"
          }`}
        >
          {isMobile
            ? null
            : coin.name.length > 6 && !isMobile
              ? coin.name.slice(0, 10).toUpperCase()
              : coin.name.toUpperCase()}

          <span
            className={`block md:hidden ${
              isActive
                ? "text-light-primary"
                : "text-dark-darkText dark:text-light-primary"
            } text-center`}
          >
            {isMobile ? coin.symbol.toUpperCase() : `(${coin.symbol.toUpperCase()})`}
          </span>
        </div>
        <div className="hidden flex-row items-center gap-2 sm:flex lg:flex-row">
          <div className="flex gap-1">
            <span
              className={`flex gap-1 text-xs ${
                isActive ? "text-[#FFFFFF70]" : "text-common-purple"
              }`}
            >
              {roundTo4Decimals(coin.current_price)}
            </span>
            <span
              className={`text-xs ${isActive ? "text-[#FFFFFF70]" : "text-common-purple"}`}
            >
              {currency}
            </span>
          </div>
          <div className="flex gap-1">
            <ArrowIconCarousel isPositive={isPositive} />
            <div
              className={`text-xs ${isPositive ? "text-[#077E77]" : "text-[#FE2264]"}`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
