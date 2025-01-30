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
  const { data, isSuccess } = useGetCoinDataQuery(params.id);

  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName,
  );
  const currencyLowercased = currency.toLowerCase();
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol,
  );

  const isPositive = data ? data.priceChangePercentage > 0 : false;
  const circulatingFromMax = calculateProgress(
    data?.circulatingSupply,
    data?.maxSupply,
  );

  return (
    <div className="m-0 mb-2 w-full flex-col overscroll-none bg-light-primaryBg px-12 dark:bg-dark-primaryBg lg:flex">
      {isSuccess && data ? (
        <>
          <NotificationCard isSuccess={isSuccess} text="Coin data loaded" />
          <div className="mt-4 flex flex-col gap-10">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <Link href="/">
                  <ArrowLeft></ArrowLeft>
                </Link>
                <p className="text-xs sm:text-sm md:text-base">
                  Portfolio / Your {data.name} summary
                </p>
              </div>
              <div className="flex w-full flex-col justify-center gap-8 lg:flex-row lg:justify-start">
                <div className="lg:justify-left flex w-full flex-col gap-8 px-8 py-10 dark:bg-dark-darkBg lg:w-2/5">
                  <div className="flex gap-6 pb-4">
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
                    <div className="flex items-end gap-4">
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
                      <div className="flex items-center gap-4">
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
                      <div className="flex w-full flex-col">
                        <div className="flex items-end gap-4">
                          <p className="text-xl">All time high:</p>
                          <p className="ml-auto text-2xl">
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
                      <div className="flex w-full flex-col">
                        <div className="flex items-end gap-4">
                          <p className="text-xl">All time low:</p>
                          <p className="ml-auto text-2xl">
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
                <div className="flex w-3/5 flex-col gap-6">
                  <div className="hidden lg:block lg:text-sm">
                    {data.description.en}
                  </div>
                  <div className="flex w-full flex-col gap-2 lg:flex-row lg:flex-wrap">
                    <div className="flex items-center justify-center gap-4 rounded-md px-4 py-6 dark:bg-dark-darkBg">
                      <a href={data.links.blockchain_site_2}>
                        <p className="text-xs sm:text-sm">
                          {formatLink(data.links.blockchain_site_2)}
                        </p>
                      </a>
                      <StackIcon />
                    </div>
                    <div className="flex items-center justify-center gap-4 rounded-md px-4 py-6 dark:bg-dark-darkBg">
                      <a href={data.links.blockchain_site_3}>
                        <p>{formatLink(data.links.blockchain_site_3)}</p>
                      </a>
                      <StackIcon />
                    </div>
                    <div className="flex items-center justify-center gap-4 rounded-md px-4 py-6 dark:bg-dark-darkBg">
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
            <div className="flex w-full flex-wrap items-stretch justify-between gap-6">
              <div className="flex w-1/3 shrink-0 grow basis-auto flex-col gap-8 rounded-md px-8 py-10 dark:bg-dark-darkBg">
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p className="text-base">Total Volume</p>
                  <p className="ml-auto flex gap-2 text-xl">
                    <span>
                      {formatNumber(data.totalVolume[currencyLowercased])}
                    </span>
                    <span>{capitaliseString(data.symbol)}</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p className="text-base">Volume 24h</p>
                  <p className="ml-auto flex gap-2 text-xl">
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
              <div className="flex w-1/3 shrink-0 grow basis-auto flex-col gap-8 rounded-md px-8 py-10 dark:bg-dark-darkBg">
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p>Max supply</p>
                  <p className="ml-auto flex gap-2 text-xl">
                    <span>{formatNumber(data.maxSupply)}</span>
                    <span>{capitaliseString(data.symbol)}</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p>Circulating Supply</p>
                  <p className="ml-auto flex gap-2 text-xl">
                    <span>
                      {formatNumber(data.circulatingSupply.toFixed())}
                    </span>
                    <span>{capitaliseString(data.symbol)}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full dark:bg-common-orange"></div>
                      <div className="text-xs">{circulatingFromMax}%</div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full dark:bg-[#f8d2a6]"></div>
                      <div className="text-xs">{100 - circulatingFromMax}%</div>
                    </div>
                  </div>

                  <ProgressBar
                    value={calculateProgress(
                      data.circulatingSupply,
                      data.maxSupply,
                    )}
                    color="#d4770c"
                    colorTwo="#f8d2a6"
                  />
                </div>
              </div>
              <div className="flex w-1/2 shrink-0 grow-0 basis-auto flex-col gap-8 rounded-md px-8 py-10 dark:bg-dark-darkBg">
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p>Market Cap</p>
                  <p className="ml-auto flex gap-2 text-xl">
                    <span>{currencySymbol}</span>
                    <span>
                      {formatNumber(data.marketCap[currencyLowercased])}
                    </span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p>Fully Diluted Valuation</p>
                  <p className="ml-auto flex gap-2 text-xl">
                    <span>{currencySymbol}</span>
                    <span>
                      {formatNumber(
                        data.fullyDilutedValuation[currencyLowercased],
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
          <NotificationCard isSuccess={false} text="Error fetching data" />
          <Spinner />
        </>
      )}
    </div>
  );
};

export default CoinDetails;
