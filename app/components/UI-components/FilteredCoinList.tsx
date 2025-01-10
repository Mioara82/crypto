import CoinDescription from "./CoinDescription";
import { CoinProps } from "./CoinDescription";

interface FilteredCoinListProps {
  list: any;
  onCoinClick: () => void;
  currencySymbol: string;
  searchedValue:string;
}

const FilteredCoinList: React.FC<FilteredCoinListProps> = ({
  list,
  onCoinClick,
  currencySymbol,
  searchedValue
}) => {
  return list.map((coin: CoinProps) => (
    <CoinDescription
      key={coin.id}
      coin={coin}
      onCoinClick={onCoinClick}
      currencySymbol={currencySymbol}
      searchedValue={searchedValue}
    />
  ));
};

export default FilteredCoinList;
