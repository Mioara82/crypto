import React, { useState } from "react";
import { Suspense } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { useGetSearchDataQuery } from "@/lib/api";
import { RootState } from "@/lib/store";
import {
  ConverterCoinProps,
  setCoinOne,
  setCoinTwo,
  swapCoins,
} from "@/lib/features/converterSlice";
import SearchCoin from "./search";
import Input from "../../UI-components/input";
import Spinner from "../../UI-components/Spinner";
import { ConverterIcon } from "../../../icons/converterIcon";

const ConverterBox = () => {
  const [quantityValue, setQuantityValue] = useState<number>(0);
  const [direction, setDirection] = useState<string>("left");
  const coinOne = useAppSelector((state: RootState) => state.converter.coinOne);
  const coinTwo = useAppSelector((state: RootState) => state.converter.coinTwo);
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName,
  );
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol,
  );
  const dispatch = useAppDispatch();
  const { currentData } = useGetSearchDataQuery(currency);
  const coinsList = currentData?.slice(0, 30);

  const exchangeValue =
    parseFloat(
      ((quantityValue * coinOne.current_price) / coinTwo.current_price).toFixed(
        2,
      ),
    ) || 0;

  const handleDirection = () => {
    dispatch(swapCoins());
    setDirection(direction === "left" ? "right" : "left");
    setQuantityValue((prev) =>
      prev === quantityValue ? exchangeValue : quantityValue,
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuantityValue(parseFloat(value));
  };

  const handleSelectedCoin = (coinId: string, direction: string) => {
    if (direction === "left") {
      dispatch(
        setCoinOne(coinsList.find((c: ConverterCoinProps) => c.id === coinId)),
      );
    } else {
      dispatch(
        setCoinTwo(coinsList.find((c: ConverterCoinProps) => c.id === coinId)),
      );
    }
  };

  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center gap-6 md:flex-row">
        <div className="flex min-w-full flex-col justify-center gap-10 rounded-2xl bg-light-primary p-6 shadow-2xl dark:bg-dark-lightBg md:min-w-[50%] md:basis-2/4">
          <h5 className="font-light">You sell</h5>
          <div className="flex h-6 items-center justify-between gap-5">
            <Suspense fallback={<Spinner />}>
              <SearchCoin
                list={coinsList}
                coin={coinOne}
                handleSelectedCoin={handleSelectedCoin}
                direction="left"
              />
            </Suspense>
            <div>
              <Input
                className="box-border w-24 rounded-md bg-light-primary dark:bg-dark-lightBg"
                type="number"
                placeholder={quantityValue}
                value={quantityValue}
                onInputChange={handleInputChange}
                onBlur={handleInputChange}
                feature="converter"
              />
            </div>
          </div>
          <div className="border-t pt-3 opacity-60">
            <p>
              1 {coinOne.symbol} ={" "}
              <span>
                {currencySymbol}
                {coinOne.current_price}
              </span>
            </p>
          </div>
        </div>
        <div className="flex min-w-full flex-col justify-center gap-10 rounded-2xl bg-light-primary p-6 shadow-2xl dark:bg-dark-lightBg md:min-w-[50%] md:basis-2/4">
          <h5 className="font-light">You buy</h5>
          <div className="flex gap-5">
            <div>
              {coinsList.length > 0 && (
                <SearchCoin
                  list={coinsList}
                  coin={coinTwo}
                  handleSelectedCoin={handleSelectedCoin}
                  direction="right"
                />
              )}
            </div>
            <p className="ml-auto">{exchangeValue.toFixed(2)}</p>
          </div>

          <div className="border-t pt-3 opacity-60">
            <p>
              1 {coinTwo.symbol} ={" "}
              <span>
                {currencySymbol}
                {coinTwo.current_price}
              </span>
            </p>
          </div>
        </div>

        <ConverterIcon handleDirection={handleDirection} />
      </div>
    </>
  );
};

export default ConverterBox;
