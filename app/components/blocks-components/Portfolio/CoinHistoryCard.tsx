import React from "react";
import { useGetHistoricalCoinsDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { FiEdit } from "react-icons/fi";
import ArrowIconCarousel from "@/app/icons/arrowIconCarousel";
import Spinner from "../../UI-components/Spinner";

const CoinHistoryCard = ({
  params,
  date,
  amount,
  currentPrice,
  hasProfit,
}: {
  params: { id: string };
  date: any;
  amount: any;
  currentPrice: number;
  hasProfit: boolean;
}) => {
  const {
    data: historicData,
    isError,
    isLoading,
  } = useGetHistoricalCoinsDataQuery({
    id: params.id,
    date,
  });
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName
  );
  const currencyLowercased = currency.toLowerCase();
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );

  const historicPrice = historicData
    ? historicData?.historicPrice[currencyLowercased]
    : 0;

  const priceChangeAmount = amount * Number(historicPrice);
  const priceChangePercentage =
    ((currentPrice - Number(historicPrice)) / Number(historicPrice)) * 100;

  return (
    <>
      {isLoading && <Spinner />}
      <div className="flex flex-col justify-between gap-8 w-full p-2">
        <div className="flex justify-between items-center">
          <p className="font-medium text-xl">Your coin</p>
          <div className="dark:bg-common-indigo rounded p-2">
            <FiEdit />
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col items-center">
            <p className="font-normal text-sm">Coin amount</p>
            <p className="font-medium text-base text-common-turqoise">
              {amount}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-normal text-sm">Amount value</p>
            {isError ? (
              <div>Error fetching data</div>
            ) : (
              <p className="font-medium text-base text-common-turqoise">
                {currencySymbol}
                {priceChangeAmount.toFixed()}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <p className="font-normal text-sm">
              Amount price change since purchase
            </p>
            {isError ? (
              <div>Error fetching data</div>
            ) : (
              <div className="flex gap-2 items-center">
                <ArrowIconCarousel isPositive={hasProfit} />
                <p
                  className={`font-medium text-base ${
                    hasProfit === true
                      ? "text-common-turqoise"
                      : "text-common-red"
                  }`}
                >
                  {priceChangePercentage.toFixed()}%
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <p className="font-normal text-sm ">Purchase date</p>
            <p className="text-common-turqoise">{date}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinHistoryCard;
