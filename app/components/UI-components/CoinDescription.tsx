import Link from "next/link";
import Image from "next/image";

interface CoinDescriptionProps {
  onCoinClick: () => void;
  currencySymbol: string;
  coin: CoinProps;
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
}) => {
  return (
    <Link
      href={`/CoinDetails/${coin.id}`}
      key={coin.id}
      onClick={onCoinClick}
      className="flex justify-stretch p-2 mb-0.5 text-sm font-Inter hover:cursor-pointer hover:bg-[#CCCCFA] hover:dark:bg-dark-hover hover:shadow-gray-400 hover:opacity-50 hover:rounded-md transition-all dura"
    >
      <p className="basis-1/6 text-light-secondaryTextColor/80  dark:text-dark-chartTextColor">
        {coin.symbol}
      </p>
      <p className="basis-1/2 text-light-secondaryTextColor/80  dark:text-dark-chartTextColor">
        {coin.name}
      </p>
      <p className="basis-1/6 text-light-secondaryTextColor/80  dark:text-dark-chartTextColor text-end mr-1">
        {currencySymbol.startsWith("https://") ? (
          <Image
            width={20}
            height={20}
            src={currencySymbol}
            alt="icon of the currency"
            style={{ display: "inline-flex" }}
          />
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
    </Link>
  );
};

export default CoinDescription;
