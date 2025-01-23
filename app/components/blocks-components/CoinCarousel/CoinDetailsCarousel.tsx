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
      className={`flex w-48 xs:w-40 cursor-pointer flex-wrap justify-center rounded-md py-2 lg:w-52 2xl:w-60 ${
        isActive
          ? "bg-common-linearGradient"
          : "bg-light-primary dark:bg-dark-191"
      }`}
      onClick={handleSelectedCoin}
    >
      <div className="m-auto w-1/6">
        <Image width={20} height={20} src={coin.image} alt="coin image" />
      </div>
      <div className="w-5/6 flex-col">
        <div
          className={`mb-2 lg:m-0 flex gap-2 text-sm xs:text-xs sm:text-sm md:text-base ${
            isActive
              ? "text-light-primary dark:text-dark-text"
              : "text-light-primaryTextColor dark:text-dark-text"
          }`}
        >
          {coin.name.length > 6 && !isMobile
            ? coin.name.slice(0, 5).concat("...").toUpperCase()
            : coin.name.toUpperCase()}
          {isMobile ? null :(
            <span 
              className={`${
                isActive ? " text-light-primary" : "text-dark-darkText dark:text-light-primary"
              }`}
            >
              ({coin.symbol.toUpperCase()})
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 lg:flex-row">
          <div className="flex gap-1">
            <span
              className={`flex gap-1 text-base xs:text-xs sm:text-sm lg:text-base ${
                isActive ? "text-[#FFFFFF70]" : "text-[#424286]"
              }`}
            >
              {roundTo4Decimals(coin.current_price)}
            </span>
            <span
              className={` text-base xs:text-xs sm:text-sm lg:text-base ${isActive ? "text-[#FFFFFF70]" : "text-[#424286]"}`}
            >
              {currency}
            </span>
          </div>
          <div className="flex gap-1">
            <ArrowIconCarousel isPositive={isPositive} />
            <div
              className={`text-xs sm:text-sm lg:text-base ${isPositive ? "text-[#077E77]" : "text-[#FE2264]"}`}
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
