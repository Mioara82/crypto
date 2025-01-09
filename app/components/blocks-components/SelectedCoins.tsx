import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { ChartCoinData } from "@/lib/features/coinSlice";
import { deleteChartCoin } from "@/lib/features/coinSlice";
import { capitaliseString } from "@/app/utils/formatHelpers";

const CoinUI = ({
  name,
  handleDeleteCoin,
}: {
  name: string;
  //I used any type as I have an eslint error "no-unused-vars" although when I write this code
  //handleDeleteCoin:(name:string) => void, the parameter is passed in the onClick function
  handleDeleteCoin: any;
}) => {
  return (
    <>
      <div className="flex items-center justify-between gap-2 rounded-md bg-common-linearGradient px-4 py-2 dark:bg-dark-darkBg">
        <h4>{capitaliseString(name)}</h4>
        <div
          className="dark:text-common-brigthBlue text-common-indigo hover:border-[1px] hover:border-dotted hover:border-light-tableTextColor hover:dark:border-dark-chartDateColor cursor-pointer rounded-full p-1"
          onClick={() => handleDeleteCoin(name)}
        >
          <RiDeleteBin5Line />
        </div>
      </div>
    </>
  );
};

const SelectedCoins = () => {
  const { chartCoins } = useAppSelector((state: RootState) => state.chartCoins);
  const selectedCoinsValues = Object.values(chartCoins);
  const selectedCoinsKeys = Object.keys(chartCoins);
  const [coinOne, coinTwo] = selectedCoinsValues;
  const [coinOneName, coinTwoName] = selectedCoinsKeys;
  const dispatch = useAppDispatch();
  const handleDeleteCoin = (coinName: string) =>
    dispatch(deleteChartCoin({ name: coinName }));

  return (
    <div className="ml-4">
      <h4 className="mb-4">Your selected coins</h4>
      <div className="flex items-center justify-start gap-4">
        {(coinOne as ChartCoinData) && (
          <CoinUI name={coinOneName} handleDeleteCoin={handleDeleteCoin} />
        )}
        {(coinTwo as ChartCoinData) && (
          <CoinUI name={coinTwoName} handleDeleteCoin={handleDeleteCoin} />
        )}
      </div>
    </div>
  );
};

export default SelectedCoins;
