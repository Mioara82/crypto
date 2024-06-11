import Image from "next/image";
import ArrowIconCarousel from "@/app/icons/arrowIconCarousel";

export interface CoinProps {
  image: string;
  id: number;
  current_price: number;
  price_change_percentage_24h: number;
  symbol: string;
  name: string;
}

export interface CoinDetailProps {
  coin: CoinProps;
  isActive: boolean;
  currency: string;
}

const CoinDetail: React.FC<CoinDetailProps> = ({
  coin,
  currency,
}) => {
  const isPositive = coin.price_change_percentage_24h > 0;
  return (
    <div className="bg-light-primary dark:bg-dark-191 flex flex-wrap w-[252px] rounded-md p-4 justify-center cursor-pointer">
      <div className="w-1/6 m-auto">
        <Image width={20} height={20} src={coin.image} alt="coin image" />
      </div>
      <div className="flex-col w-5/6">
        <div className="flex gap-2">
          {coin.name.length > 6 ? coin.name.slice(0,5).concat("...").toUpperCase() : coin.name.toUpperCase()}
          <span>({coin.symbol.toUpperCase()})</span>
        </div>
        <div className="flex gap-1">
          {coin.current_price}
          <span>{currency}</span>
          <ArrowIconCarousel isPositive={isPositive} />
          <div>{coin.price_change_percentage_24h.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
