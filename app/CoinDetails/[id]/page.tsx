"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetCoinDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import type { RootState } from "@/lib/store";
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
  const { data, isSuccess } = useGetCoinDataQuery({
    endpoint: "CoinDetails",
    query: { id: params.id.trim().toLowerCase() },
  });

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
    <div className="m-0 mb-2 block w-full flex-col overscroll-none bg-light-primaryBg px-12 dark:bg-dark-primaryBg lg:flex">
      {isSuccess && data ? (
        <>
          <NotificationCard isSuccess={isSuccess} text="Coin data loaded" />
          <div className="mt-4 flex flex-col gap-10">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-4">
                <Link href="/">
                  <ArrowLeft />
                </Link>
                <p className="text-xs sm:text-sm md:text-base">
                  Portfolio / Your {data.name} summary
                </p>
              </div>
              <div className="flex w-full flex-col justify-center gap-8 lg:flex-row lg:justify-start">
                <div className="lg:justify-left flex w-full flex-col gap-4 rounded-lg px-8 py-10 shadow-md dark:bg-dark-darkBg dark:drop-shadow-md lg:w-2/5 lg:gap-8">
                  <div className="flex items-center gap-6 pb-4">
                    <div className="relative h-6 w-6 xs:h-7 xs:w-7 sm:h-8 md:w-8 lg:h-9 lg:w-9">
                      <Image
                        src={data.image.large}
                        alt="coin icon"
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div>
                      <p className="text-xs xs:text-base sm:text-xl lg:text-2xl">
                        {data.name}
                        <span>({data.symbol})</span>
                      </p>
                      <div className="flex gap-2">
                        <a href={data.links.homepage}>
                          <p className="text-xs xs:text-base md:text-base">
                            {data.links.homepage.slice(7)}
                          </p>
                        </a>
                        <StackIcon />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 lg:gap-5">
                    <div className="flex items-end gap-4">
                      <h3 className="text-sm sm:text-base lg:text-2xl xl:text-4xl">
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
                          } text-xs sm:text-sm`}
                        >
                          {data.priceChangePercentage.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-4">
                        <p className="text-sm md:text-base lg:text-xl">
                          Profit:{" "}
                        </p>
                        <span
                          className={`${
                            isPositive ? "text-[#077E77]" : "text-[#FE2264]"
                          } md text-sm`}
                        >
                          {currencySymbol}
                          {formatNumber(Math.ceil(data.profit))}
                        </span>
                      </div>
                    </div>
                  </div>
                  <hr className="opacity-10" />
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-3">
                      <div className="justify-self-start pt-2">
                        <ArrowIconCarousel isPositive={isPositive} />
                      </div>
                      <div className="flex w-full flex-col">
                        <div className="flex items-end gap-4">
                          <p className="text-sm md:text-base lg:text-xl">
                            All time high:
                          </p>
                          <p className="ml-auto text-sm md:text-base lg:text-2xl">
                            {currencySymbol}
                            {formatNumber(data.ath[currencyLowercased])}
                          </p>
                        </div>
                        <p className="text-xs text-dark-chartDateColor xs:text-sm lg:text-base">
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
                          <p className="text-sm md:text-base lg:text-xl">
                            All time low:
                          </p>
                          <p className="ml-auto text-sm md:text-base lg:text-2xl">
                            {currencySymbol}
                            {formatNumber(data.atl[currencyLowercased])}
                          </p>
                        </div>
                        <p className="text-xs text-dark-chartDateColor xs:text-sm lg:text-base">
                          {formatDate(data.atlDate[currencyLowercased])}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full gap-2 xs:flex-col sm:flex-row md:flex-row lg:h-full lg:w-3/5 lg:flex-col">
                  <div className="h-52 overflow-scroll overscroll-y-auto text-xs sm:text-sm lg:h-full lg:overflow-hidden lg:overscroll-y-none">
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
                        <p className="text-xs sm:text-sm">
                          {formatLink(data.links.blockchain_site_3)}
                        </p>
                      </a>
                      <StackIcon />
                    </div>
                    <div className="flex items-center justify-center gap-4 rounded-md px-4 py-6 dark:bg-dark-darkBg">
                      <a href={data.links.blockchair}>
                        <p className="text-xs sm:text-sm">
                          {formatLink(data.links.blockchair)}
                        </p>
                      </a>
                      <StackIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="opacity-10" />
            <div className="flex w-full flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-between">
              <div className="flex w-full shrink-0 grow basis-auto flex-col gap-8 rounded-md px-8 py-10 dark:bg-dark-darkBg sm:w-1/3">
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p className="text-xs xs:text-base">Total Volume</p>
                  <p className="ml-auto flex gap-2 text-xs xs:text-sm md:text-base lg:text-xl">
                    <span>
                      {formatNumber(data.totalVolume[currencyLowercased])}
                    </span>
                    <span>{capitaliseString(data.symbol)}</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p className="text-xs xs:text-base">Volume 24h</p>
                  <p className="ml-auto flex gap-2 text-xs xs:text-sm md:text-base lg:text-xl">
                    <span>
                      {currencySymbol}
                      {formatNumber(data.marketCapChange)}
                    </span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p className="text-xs xs:text-base">Volume / Market</p>
                  <p className="ml-auto text-xs xs:text-base">
                    {(
                      data.totalVolume[currencyLowercased] /
                      data.marketCap[currencyLowercased]
                    ).toFixed(5)}
                  </p>
                </div>
              </div>
              <div className="flex w-full shrink-0 grow basis-auto flex-col gap-8 rounded-md px-8 py-10 dark:bg-dark-darkBg sm:w-1/3">
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p className="text-xs xs:text-base">Max supply</p>
                  <p className="ml-auto flex gap-2 text-xs xs:text-sm md:text-base lg:text-xl">
                    <span>{formatNumber(data.maxSupply)}</span>
                    <span>{capitaliseString(data.symbol)}</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p className="text-xs xs:text-base">Circulating Supply</p>
                  <p className="ml-auto flex gap-2 text-xs xs:text-sm md:text-base lg:text-xl">
                    <span>
                      {formatNumber(data.circulatingSupply.toFixed())}
                    </span>
                    <span>{capitaliseString(data.symbol)}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full dark:bg-common-orange" />
                      <div className="text-xs">{circulatingFromMax}%</div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full dark:bg-[#f8d2a6]" />
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
              <div className="flex w-full shrink-0 grow-0 basis-auto flex-col gap-8 rounded-md px-8 py-10 dark:bg-dark-darkBg sm:w-[calc(50%_-_15px)]">
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p className="text-xs xs:text-base">Market Cap</p>
                  <p className="ml-auto flex gap-2 text-xs xs:text-sm md:text-base lg:text-xl">
                    <span>{currencySymbol}</span>
                    <span>
                      {formatNumber(data.marketCap[currencyLowercased])}
                    </span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <PlusIcon />
                  <p className="text-xs xs:text-base">
                    Fully Diluted Valuation
                  </p>
                  <p className="ml-auto flex gap-2 text-xs xs:text-sm md:text-base lg:text-xl">
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
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <Spinner />
          </div>
        </>
      )}
    </div>
  );
};

export default CoinDetails;
