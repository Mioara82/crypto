import React from "react";
import { Suspense } from "react";
import { FiEdit } from "react-icons/fi";
import { useGetHistoricalCoinsDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import ArrowIconCarousel from "@/app/icons/arrowIconCarousel";
import Spinner from "../../UI-components/Spinner";

const CoinHistoryCard = ({
  params,
  date,
  amount,
  currentPrice,
  hasProfit,
  openEditForm,
}: {
  params: { id: string };
  date: any;
  amount: any;
  currentPrice: number;
  hasProfit: boolean;
  openEditForm: any;
}) => {
  const { data: historicData, isError } = useGetHistoricalCoinsDataQuery({
    id: params.id,
    date,
  });
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName,
  );
  const currencyLowercased = currency.toLowerCase();
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol,
  );

  const historicPrice = historicData
    ? historicData?.historicPrice[currencyLowercased]
    : 0;

  const priceChangeAmount = amount * Number(historicPrice);
  const priceChangePercentage =
    ((currentPrice - Number(historicPrice)) / Number(historicPrice)) * 100;

  const errorMessage = "An error occurred";

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <div className="flex w-full flex-col justify-between gap-4 p-2 md:gap-8">
          <div className="flex items-center justify-between">
            <p className="text-base font-medium opacity-60 lg:text-xl">
              Your coin
            </p>
            <div
              className="cursor-pointer rounded border-[1px] border-skeleton100 p-2 hover:border-common-portfolioButton dark:border-0 dark:bg-common-linearGradient dark:hover:border-[1px] dark:hover:border-common-brigthBlue"
              onClick={openEditForm}
            >
              <FiEdit />
            </div>
          </div>
          {isError ? (
            <p>{errorMessage}</p>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col items-center">
                <p className="text-sm font-normal">Coin amount</p>
                <p className="text-base font-medium text-common-turqoise">
                  {amount}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm font-normal">Amount value</p>
                {isError ? (
                  <div>Error fetching data</div>
                ) : (
                  <p className="text-base font-medium text-common-turqoise">
                    {currencySymbol}
                    {priceChangeAmount.toFixed()}
                  </p>
                )}
              </div>
              <div className="hidden flex-col items-center justify-center sm:flex">
                <div className="text-sm font-normal">
                  <span
                    className={`${
                      hasProfit
                        ? "text-common-turqoise"
                        : "text-light-darkBg dark:text-light-primary"
                    } mr-2`}
                  >
                    Gain
                  </span>
                  /
                  <span
                    className={`${
                      hasProfit ? "text-light-primary" : "text-common-red"
                    } ml-2`}
                  >
                    Loss
                  </span>
                </div>
                {isError ? (
                  <div>Error fetching data</div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ArrowIconCarousel isPositive={hasProfit} />
                    <p
                      className={`text-base font-medium ${
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
              <div className="hidden flex-col items-center md:flex">
                <p className="text-sm font-normal">Purchase date</p>
                <p className="text-common-turqoise">{date}</p>
              </div>
            </div>
          )}
        </div>
      </Suspense>
    </>
  );
};

export default CoinHistoryCard;
