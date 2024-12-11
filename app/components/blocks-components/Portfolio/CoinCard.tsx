import React from "react";
import { Suspense } from "react";
import { FiX } from "react-icons/fi";
import { useGetCoinDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import ArrowIconCarousel from "@/app/icons/arrowIconCarousel";
import ProgressBar from "../../UI-components/progressBar";
import DeleteCoinModal from "./DeleteCoinModal";
import Spinner from "../../UI-components/Spinner";

const CoinCard = ({
  params,
  handleDeleteModalDisplay,
  isDeleteModalOpen,
}: {
  params: { id: string };
  handleDeleteModalDisplay: () => void;
  isDeleteModalOpen: boolean;
}) => {
  const { data, isSuccess, isError } = useGetCoinDataQuery(params.id);
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName,
  );
  const currencyLowercased = currency.toLowerCase();
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol,
  );
  const isPositive = data ? data.priceChangePercentage > 0 : false;
  const errorMessage = "An error occurred";

  return (
    <Suspense fallback={<Spinner />}>
      <div className="relative z-0">
        {isSuccess && data && (
          <div>
            <div className="flex flex-col gap-4 p-2">
              <div className="flex items-center justify-between">
                <p className="text-xl font-medium">Market price</p>
                <div
                  className="cursor-pointer rounded border-[1px] border-skeleton100 p-2 hover:border-common-portfolioButton dark:border-0 dark:bg-common-linearGradient dark:hover:border-[1px] dark:hover:border-common-brigthBlue"
                  onClick={handleDeleteModalDisplay}
                >
                  <FiX />
                </div>
              </div>
              {isDeleteModalOpen && (
                <DeleteCoinModal
                  handleDeleteModalDisplay={handleDeleteModalDisplay}
                  coinId={params.id}
                  name={data.name}
                  coinImage={data.image.small}
                />
              )}
              {isError ? (
                <p>{errorMessage}</p>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-sm font-normal">Current price</p>
                    <div className="flex gap-1 text-base font-medium text-common-turqoise">
                      <span>{currencySymbol}</span>
                      <span>{data.currentPrice[currencyLowercased]}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-sm font-normal">Price change 24h</p>
                    <div className="flex gap-2">
                      <ArrowIconCarousel isPositive={isPositive} />
                      <p
                        className={`text-base font-medium ${
                          isPositive
                            ? "text-common-turqoise"
                            : "text-common-red"
                        } `}
                      >
                        {data.priceChangePercentage.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-4">
                    <p className="text-sm font-normal">Market cap vs volume</p>
                    <div className="flex items-center gap-2">
                      <p>
                        {Math.round(
                          (data.totalVolume[currencyLowercased] /
                            data.marketCap[currencyLowercased]) *
                            100,
                        )}
                        <span>%</span>
                      </p>
                      <ProgressBar
                        value={Math.round(
                          (data.totalVolume[currencyLowercased] /
                            data.marketCap[currencyLowercased]) *
                            100,
                        )}
                        color="#00b1a7"
                        colorTwo="#ffffff60"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-sm font-normal">
                      Circ supply vs max supply
                    </p>
                    <div>
                      <p>
                        {Math.round(
                          (data.circulatingSupply / data.maxSupply) * 100,
                        )}{" "}
                        <span>%</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default CoinCard;
