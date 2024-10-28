import Image from "next/image";
import ArrowIconCarousel from "@/app/icons/arrowIconCarousel";

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
  onSelectCoin: () => void;
}

const CoinDetail: React.FC<CoinDetailProps> = ({
  coin,
  currency,
  isActive,
  onSelectCoin,
}) => {
  const isPositive = coin.price_change_percentage_24h > 0;
  return (
    <div
      className={`flex flex-wrap w-[252px] rounded-md p-4 justify-center cursor-pointer ${
        isActive
          ? "bg-common-linearGradient"
          : "bg-light-primary dark:bg-dark-191"
      }`}
      onClick={onSelectCoin}
    >
      <div className="w-1/6 m-auto">
        <Image width={20} height={20} src={coin.image} alt="coin image" />
      </div>
      <div className="flex-col w-5/6">
        <div
          className={`flex gap-2 ${
            isActive ? ("text-light-primary dark:text-dark-text") :("text-light-primaryTextColor dark:text-dark-text")
          }`}
        >
          {coin.name.length > 6
            ? coin.name.slice(0, 5).concat("...").toUpperCase()
            : coin.name.toUpperCase()}
          <span
            className={`${
              isActive ? "text-light-primary" : " dark:text-dark-darkText"
            }`}
          >
            ({coin.symbol.toUpperCase()})
          </span>
        </div>
        <div className="flex gap-1">
          <span
            className={`flex gap-1 ${
              isActive ? "text-[#FFFFFF70]" : "text-[#424286]"
            }`}
          >
            {coin.current_price}
          </span>
          <span
            className={`${isActive ? "text-[#FFFFFF70]" : "text-[#424286]"}`}
          >
            {currency}
          </span>
          <ArrowIconCarousel isPositive={isPositive} />
          <div
            className={`${isPositive ? "text-[#077E77]" : "text-[#FE2264]"}`}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
