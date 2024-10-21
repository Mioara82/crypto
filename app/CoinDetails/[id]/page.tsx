"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetCoinDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { ArrowLeft } from "@/app/icons/coinPageIcons";
import { StackIcon } from "@/app/icons/coinPageIcons";
import ArrowIconCarousel from "@/app/icons/arrowIconCarousel";
import ProgressBar from "@/app/components/UI-components/progressBar";
import { PlusIcon } from "@/app/icons/coinPageIcons";
import { formatDate, calculateProgress } from "@/app/utils/formatHelpers";
import Spinner from "@/app/components/UI-components/Spinner";

const CoinDetails = ({ params }: { params: { id: string } }) => {
  const { data, isSuccess } = useGetCoinDataQuery(params.id);
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName
  );
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );

  const isPositive = data ? data.priceChangePercentage > 0 : false;

  return (
    <div>
      {isSuccess && data ?(
        <>
          <div>
            <Link href="/">
              <ArrowLeft></ArrowLeft>
            </Link>
            <p>Portfolio / Your {data.name} summary</p>
          </div>
          <div>
            <div>
              <div>
                <Image
                  src={data.image.large}
                  alt="coin icon"
                  width={28}
                  height={28}
                />
                <div>
                  <p>
                    {data.name}
                    <span>({data.symbol})</span>
                  </p>
                  <div>
                    <a href={data.links.homepage}>
                      <p>{data.links.homepage.slice(6)}</p>
                      <StackIcon />
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <h3>
                  {currencySymbol}
                  <span>{data.currentPrice[currency]}</span>
                </h3>
                <ArrowIconCarousel isPositive={isPositive} />
                <p>
                  Profit:{" "}
                  <span>
                    {currencySymbol}
                    {data.profit}
                  </span>
                </p>
              </div>
              <hr></hr>
              <div>
                <div>
                  <ArrowIconCarousel isPositive={isPositive} />
                  All time high:
                  <p>
                    {currencySymbol}
                    {data.ath[currency]}
                  </p>
                </div>
                <p>{formatDate(data.athDate[currency])}</p>
                <div>
                  <ArrowIconCarousel isPositive={isPositive} />
                  All time low:
                  <p>
                    {currencySymbol}
                    {data.atl[currency]}
                  </p>
                </div>
                <p>{formatDate(data.atlDate[currency])}</p>
              </div>
            </div>
            <div>{data.description.en}</div>
            <div>
              <div>
                <a href={data.links.blockchain_site_2}>
                  <p>{data.links.blockchain_site_2.slice(6)}</p>
                  <StackIcon />
                </a>
              </div>
              <div>
                <a href={data.links.blockchain_site_3}>
                  <p>{data.links.blockchain_site_3.slice(6)}</p>
                  <StackIcon />
                </a>
              </div>
              <div>
                <a href={data.links.blockchair}>
                  <p>{data.links.blockchair.slice(6)}</p>
                  <StackIcon />
                </a>
              </div>
            </div>
          </div>
          <hr></hr>
          <div>
            <div>
              <PlusIcon />
              <p>Total Volume</p>
              <p>
                {data.totalVolume[currency]}
                {data.symbol}
              </p>
            </div>
            <div>
              <PlusIcon />
              <p>Volume 24h</p>
              <p>
                {currencySymbol}
                {data.marketCapChange}
              </p>
            </div>
            <div>
              <PlusIcon />
              <p>Volume / Market</p>
              <p>
                {data.totalVolume[currency] / data.marketCapChange[currency]}
              </p>
            </div>
          </div>
          <div>
            <div>
              <PlusIcon />
              <p>Max supply</p>
              <p>
                {data.maxSupply}
                {data.symbol}
              </p>
            </div>
            <div>
              <PlusIcon />
              <p>Circulating Supply</p>
              <p>
                {data.circulatingSupply}
                {data.symbol}
              </p>
              <div>
                <div>
                  <div>
                    <div className="w-1 h-1 rounded-full dark:bg-common-orange"></div>
                    <div>
                      {calculateProgress(
                        data.circulatingSupply,
                        data.maxSupply
                      )}
                      %
                    </div>
                  </div>
                  <div>
                    <div className="w-1 h-1 rounded-full  dark:bg-[#f8d2a6]"></div>
                    <div>
                      {100 -
                        calculateProgress(
                          data.circulatingSupply,
                          data.maxSupply
                        )}
                      %
                    </div>
                  </div>
                </div>
                <ProgressBar
                  value={calculateProgress(
                    data.circulatingSupply,
                    data.maxSupply
                  )}
                  color="#f8d2a6"
                  colorTwo="#f8d2a660"
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <PlusIcon />
              <p>Market Cap</p>
              <p>
                {currencySymbol}
                {data.marketCap[currency]}
              </p>
            </div>
            <div>
              <PlusIcon />
              <p>Fully Diluted Valuation</p>
              <p>
                {currencySymbol}
                {data.fullyDilutedValuation[currency]}
              </p>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CoinDetails;
