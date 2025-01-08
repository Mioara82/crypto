import React from "react";
import Image from "next/image";
import Spinner from "../../UI-components/Spinner";

interface CoinProps {
  id: string;
  image: string;
  name: string;
  currentPrice: number;
}

interface CalculatorCoinProps {
  error: boolean;
  loading: boolean;
  list: CoinProps[];
  handleCoinSelection: any;
  currencySymbol: string;
}

const CalculatorCoinList: React.FC<CalculatorCoinProps> = (props) => {
  return (
    <>
      <ul
        className="absolute left-[25%] top-[20%] z-10 h-96 w-[34em] overflow-y-auto rounded-xl bg-[#ccccfa] py-2 pl-9 pr-4 dark:bg-dark-191"
      >
        {props.loading && <Spinner />}
        {props.error && (
          <p className="absolute -bottom-6 left-0 mt-2 text-xs text-common-red/80">
            Error loading coins data
          </p>
        )}
        {props.list.map((coin: any) => (
          <li
            className="mb-2 flex items-center gap-2"
            key={coin.id}
            onClick={() => props.handleCoinSelection(coin.id)}
          >
            <Image src={coin.image} alt="coin image" width={20} height={20} />
            <p className="text-sm">{coin.name}</p>
            <p className="text-xs opacity-40">
              <span className="mr-1">{props.currencySymbol}</span>
              {coin.currentPrice.toFixed(3)}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CalculatorCoinList;
