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
import NotificationCard from "@/app/components/UI-components/NotificationCard";
import {
  formatDate,
  calculateProgress,
  formatLink,
  capitaliseString,
  formatNumber,
} from "@/app/utils/formatHelpers";
import Spinner from "@/app/components/UI-components/Spinner";

const CoinDetails = ({ params }: { params: { id: string } }) => {
  const { data, isSuccess, isError } = useGetCoinDataQuery(params.id);
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName
  );
  const currencyLowercased = currency.toLowerCase();
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol
  );

  const isPositive = data ? data.priceChangePercentage > 0 : false;

  return (
    <div className="flex flex-col w-maxWidth-custom mx-[72px] mt-16 bg-light-primaryBg dark:bg-dark-primaryBg">
      {isSuccess && data ? (
        <>
          <NotificationCard isSuccess={isSuccess} text="Coin data loaded" />
          <div className="flex flex-col gap-[40px]">
            <div>
              <div className="flex gap-4 items-center">
                <Link href="/">
                  <ArrowLeft></ArrowLeft>
                </Link>
                <p>Portfolio / Your {data.name} summary</p>
              </div>
              <div className="flex justify-left gap-8">
                <div className="dark:bg-dark-darkBg flex flex-col gap-8 w-2/5 justify-left px-8 py-10">
                  <div className="flex pb-4 gap-6">
                    <Image
                      src={data.image.large}
                      alt="coin icon"
                      width={48}
                      height={48}
                    />
                    <div>
                      <p className="text-2xl">
                        {data.name}
                        <span>({data.symbol})</span>
                      </p>
                      <div className="flex gap-2">
                        <a href={data.links.homepage}>
                          <p className="text-base">
                            {data.links.homepage.slice(7)}
                          </p>
                        </a>
                        <StackIcon />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-4 items-end">
                      <h3 className="text-4xl">
                        {currencySymbol}
                        <span>
                          {formatNumber(data.currentPrice[currencyLowercased])}
                        </span>
                      </h3>
                      <div className="flex gap-1">
                        <ArrowIconCarousel isPositive={isPositive} />
                        <p
                          className={`${
                            isPositive ? "text-[#077E77]" : "text-[#FE2264]"
                          }`}
                        >
                          {data.priceChangePercentage.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex gap-4 items-center">
                        <p className="text-xl">Profit: </p>
                        <span
                          className={`${
                            isPositive ? "text-[#077E77]" : "text-[#FE2264]"
                          }`}
                        >
                          {currencySymbol}
                          {formatNumber(Math.ceil(data.profit))}
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr className="opacity-10"></hr>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-3">
                      <div className="justify-self-start pt-2">
                        <ArrowIconCarousel isPositive={isPositive} />
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex items-end gap-4">
                          <p className="text-xl">All time high:</p>
                          <p className="text-2xl ml-auto">
                            {currencySymbol}
                            {formatNumber(data.ath[currencyLowercased])}
                          </p>
                        </div>
                        <p className="text-base text-dark-chartDateColor">
                          {formatDate(data.athDate[currencyLowercased])}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-start gap-3">
                      <div className="justify-self-start pt-2">
                        <ArrowIconCarousel isPositive={isPositive} />
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex items-end gap-4">
                          <p className="text-xl">All time low:</p>
                          <p className="text-2xl ml-auto">
                            {currencySymbol}
                            {formatNumber(data.atl[currencyLowercased])}
                          </p>
                        </div>
                        <p className="text-base text-dark-chartDateColor">
                          {formatDate(data.atlDate[currencyLowercased])}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-3/5 flex flex-col gap-6">
                  <div className="text-sm">{data.description.en}</div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex rounded-md py-6 px-4 justify-center items-center gap-4 dark:bg-dark-darkBg">
                      <a href={data.links.blockchain_site_2}>
                        <p>{formatLink(data.links.blockchain_site_2)}</p>
                      </a>
                      <StackIcon />
                    </div>
                    <div className="flex rounded-md py-6 px-4 justify-center items-center gap-4 dark:bg-dark-darkBg">
                      <a href={data.links.blockchain_site_3}>
                        <p>{formatLink(data.links.blockchain_site_3)}</p>
                      </a>
                      <StackIcon />
                    </div>
                    <div className="flex rounded-md py-6 px-4 justify-center items-center gap-4 dark:bg-dark-darkBg">
                      <a href={data.links.blockchair}>
                        <p>{formatLink(data.links.blockchair)}</p>
                      </a>
                      <StackIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="opacity-10"></hr>
            <div className="flex flex-wrap gap-6 w-full justify-between items-stretch">
              <div className="flex grow shrink-0 basis-auto flex-col dark:bg-dark-darkBg px-8 py-10 gap-8 rounded-md w-1/3">
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p className="text-base">Total Volume</p>
                  <p className="flex gap-2 text-xl ml-auto">
                    <span>
                      {formatNumber(data.totalVolume[currencyLowercased])}
                    </span>
                    <span>{capitaliseString(data.symbol)}</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p className="text-base">Volume 24h</p>
                  <p className="flex gap-2 text-xl ml-auto">
                    <span>
                      {currencySymbol}
                      {formatNumber(data.marketCapChange)}
                    </span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p>Volume / Market</p>
                  <p className="ml-auto">
                    {(
                      data.totalVolume[currencyLowercased] /
                      data.marketCap[currencyLowercased]
                    ).toFixed(5)}
                  </p>
                </div>
              </div>
              <div className="flex grow shrink-0 basis-auto flex-col dark:bg-dark-darkBg px-8 py-10 gap-8 rounded-md w-1/3">
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p>Max supply</p>
                  <p className="flex gap-2 ml-auto text-xl">
                    <span>{formatNumber(data.maxSupply)}</span>
                    <span>{capitaliseString(data.symbol)}</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p>Circulating Supply</p>
                  <p className="flex gap-2 ml-auto text-xl">
                    <span>{formatNumber(data.circulatingSupply)}</span>
                    <span>{capitaliseString(data.symbol)}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex">
                    <div className="flex gap-2 items-center">
                      <div className="w-2 h-2 rounded-full dark:bg-common-orange"></div>
                      <div className="text-xs">
                        {calculateProgress(
                          data.circulatingSupply,
                          data.maxSupply
                        )}
                        %
                      </div>
                    </div>
                    <div className="flex gap-2 items-center ml-auto">
                      <div className="w-2 h-2 rounded-full  dark:bg-[#f8d2a6]"></div>
                      <div className="text-xs">
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
                    color="#d4770c"
                    colorTwo="#f8d2a6"
                  />
                </div>
              </div>
              <div className="flex grow-0 shrink-0 basis-auto flex-col dark:bg-dark-darkBg px-8 py-10 gap-8 rounded-md w-1/2">
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p>Market Cap</p>
                  <p className="flex gap-2 ml-auto text-xl">
                    <span>{currencySymbol}</span>
                    <span>
                      {formatNumber(data.marketCap[currencyLowercased])}
                    </span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p>Fully Diluted Valuation</p>
                  <p className="flex gap-2 ml-auto text-xl">
                    <span>{currencySymbol}</span>
                    <span>
                      {formatNumber(
                        data.fullyDilutedValuation[currencyLowercased]
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <NotificationCard isSuccess={isError} text="Error fetching data" />
          <Spinner />
        </>
      )}
    </div>
  );
};

export default CoinDetails;
