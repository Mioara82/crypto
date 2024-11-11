import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { useGetSearchDataQuery } from "@/lib/api";
import { RootState } from "@/lib/store";
import {
  ConverterCoinProps,
  setCoinOne,
  setCoinTwo,
} from "@/lib/features/converterSlice";
import SearchCoin from "./search";
import { ConverterIcon } from "../../../icons/converterIcon";

const ConverterBox = () => {
  const [quantityValue, setQuantityValue] = useState<number>(0);
  const [direction, setDirection] = useState<string>("left");
  const coinOne = useAppSelector((state: RootState) => state.converter.coinOne);
  const coinTwo = useAppSelector((state: RootState) => state.converter.coinTwo);
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName
  );
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );
  const dispatch = useAppDispatch();
  const { currentData, isSuccess } = useGetSearchDataQuery(currency);
  const coinsList = currentData?.slice(0, 30);
  const exchangeValue =
    (quantityValue * coinOne.current_price) / coinTwo.current_price;

  const isValidLeft =
    isSuccess && coinsList && coinsList.length > 0 && direction === "left";

  const isValidRight =
    isSuccess && coinsList && coinsList.length > 0 && direction === "right";

  const handleDirection = () => {
    setDirection(direction === "left" ? "right" : "left");
  };

  const handleSelectedCoin = (coinId: string) => {
    if (direction === "left") {
      dispatch(
        setCoinOne(coinsList.find((c: ConverterCoinProps) => c.id === coinId))
      );
    } else {
      dispatch(
        setCoinTwo(coinsList.find((c: ConverterCoinProps) => c.id === coinId))
      );
    }
  };

  return (
    <>
      <div>
        <div>
          <h5>You sell</h5>
          <div>
            {isValidLeft && (
              <SearchCoin
                list={coinsList}
                coin={coinOne}
                handleSelectedCoin={handleSelectedCoin}
              />
            )}
            <form>
              <input
                type="number"
                value={quantityValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuantityValue(parseFloat(e.target.value) || 0)
                }
              />
            </form>
          </div>
          <hr />
          {isSuccess && coinOne && (
            <div>
              <p>
                1 {coinOne.symbol} ={" "}
                <span>
                  {currencySymbol}
                  {coinOne.current_price}
                </span>
              </p>
            </div>
          )}
        </div>
        <ConverterIcon handleDirection={handleDirection} />
        <div>
          <h5>You buy</h5>
          <div>
            {isValidRight && (
              <SearchCoin
                list={coinsList}
                coin={coinTwo}
                handleSelectedCoin={handleSelectedCoin}
              />
            )}
            <p>{exchangeValue}</p>
          </div>
          <hr />
          {isSuccess && coinTwo && (
            <div>
              <p>
                1 {coinTwo.symbol} ={" "}
                <span>
                  {currencySymbol}
                  {coinTwo.current_price}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConverterBox;
