import React from "react";
import Image from "next/image";
import Spinner from "../../UI-components/Spinner";
import { findHighlighted } from "@/app/utils/searchFormatter";

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
  searchValue: string;
}

const CalculatorCoinList: React.FC<CalculatorCoinProps> = (props) => {
  return (
    <>
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
          <div className="relative h-4 w-4">
            <Image
              src={coin.image}
              alt="coin image"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <p className="text-sm">
            {findHighlighted(coin.name, props.searchValue)}
          </p>
          <p className="text-xs opacity-40">
            <span className="mr-1">{props.currencySymbol}</span>
            {coin.currentPrice.toFixed(3)}
          </p>
        </li>
      ))}
    </>
  );
};

export default CalculatorCoinList;
