import React from "react";
import { FiX } from "react-icons/fi";
import { useGetCoinDataQuery } from "@/lib/api";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import ArrowIconCarousel from "@/app/icons/arrowIconCarousel";
import ProgressBar from "../../UI-components/progressBar";
import { removeCoin } from "@/lib/features/portfolioSlice";

const CoinCard = ({ params, id }: { params: { id: string }; id: string }) => {
  const { data, isSuccess, isLoading, isError } = useGetCoinDataQuery(
    params.id
  );

  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName
  );
  const currencyLowercased = currency.toLowerCase();
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );
  const dispatch = useAppDispatch();
  const handleRemoveCoin = (id: string) => dispatch(removeCoin(id));
  const isPositive = data ? data.priceChangePercentage > 0 : false;

  return (
    <div>
      {isLoading && <div> loading</div>}
      {isError && <div>error</div>}
      {isSuccess && data && (
        <div>
          <div className="flex flex-col gap-4 p-2">
            <div className="flex justify-between items-center">
              <p className="font-medium text-xl">Market price</p>
              <div
                className="dark:bg-common-indigo rounded p-2"
                onClick={() => handleRemoveCoin(id)}
              >
                <FiX />
              </div>
            </div>
            <div className="flex justify-between items-center gap-3">
              <div className="flex flex-col items-center  gap-4">
                <p className="font-normal text-sm">Current price</p>
                <div className="flex gap-1 font-medium text-base text-common-turqoise">
                  {currencySymbol}
                  {data.currentPrice[currencyLowercased]}
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="font-normal text-sm">Price change 24h</p>
                <div className="flex gap-2">
                  <ArrowIconCarousel isPositive={isPositive} />
                  <p
                    className={`font-medium text-base ${
                      isPositive ? "text-common-turqoise" : "text-common-red"
                    } `}
                  >
                    {data.priceChangePercentage.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <p className="font-normal text-sm">Market cap vs volume</p>
                <div className="flex gap-2 items-center">
                  <p>
                    {Math.round(
                      (data.totalVolume[currencyLowercased] /
                        data.marketCap[currencyLowercased]) *
                        100
                    )}
                    <span>%</span>
                  </p>
                  <ProgressBar
                    value={Math.round(
                      (data.totalVolume[currencyLowercased] /
                        data.marketCap[currencyLowercased]) *
                        100
                    )}
                    color="#00b1a7"
                    colorTwo="#ffffff60"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="font-normal text-sm">Circ supply vs max supply</p>
                <div>
                  <p>
                    {Math.round(
                      (data.circulatingSupply / data.maxSupply) * 100
                    )}{" "}
                    <span>%</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinCard;
