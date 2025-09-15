import React from "react";
import Image from "next/image";
import ProgressBar from "@/app/components/UI-components/progressBar";
import { formatMarketCap, roundNumber } from "@/app/utils/formatHelpers";

interface Data {
  coinData: number;
  exchange: number;
  totalMarketCap: { [key: string]: number };
  totalVolumePerCurrency: { [key: string]: number };
  btcMarketCapPercentage: number;
  ethMarketCapPercentage: number;
}

interface MarketDataInfoProps {
  data: Data;
  currency: string;
  currencySymbol: string;
}

const MarketDataInfo: React.FC<MarketDataInfoProps> = ({
  data,
  currency,
  currencySymbol,
}) => {
  return (
    <>
      <nav className="m-0 mx-auto flex w-full flex-nowrap justify-around gap-2 rounded-t-md bg-light-darkBg py-4 dark:bg-[#191925]">
        <div className="flex items-center justify-between gap-8 text-xs">
          <div className="inline-flex items-center gap-2">
            <div className="inline-flex justify-items-center gap-1 text-light-lightTextColor">
              <div className="relative h-4 w-4">
                <Image
                  src="/market/coin.svg"
                  alt="flashing symbol of a coin"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <span>Coins</span>
            </div>
            <div className="text-light-primary">{data.coinData}</div>
          </div>

          <div className="inline-flex justify-items-center gap-2">
            <div className="inline-flex justify-items-center gap-1 text-light-lightTextColor">
              <div className="relative h-4 w-4">
                <Image
                  src="/market/exchange.svg"
                  alt="two squares overlapping"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <span>Exchange</span>
            </div>
            <div className="text-light-primary">{data.exchange}</div>
          </div>

          <div className="hidden items-center text-light-lightTextColor xs:inline-flex xs:gap-1">
            <div className="relative h-4 w-4">
              <Image
                src="/market/arrow.svg"
                alt="a coloured arrow"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="text-light-primary">
              {formatMarketCap(data.totalMarketCap[currency])}
            </div>
          </div>
          <div className="hidden items-center justify-items-center gap-2 sm:inline-flex">
            <div className="text-light-primary">
              {currencySymbol.startsWith("https://") ? (
                <div className="relative h-5 w-5">
                  <Image
                    src={currencySymbol}
                    alt="icon of the currency"
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ) : (
                currencySymbol
              )}
              <span className="ml-1">
                {formatMarketCap(data.totalVolumePerCurrency[currency])}
              </span>
            </div>
            <ProgressBar
              value={5}
              color="#ffffff"
              colorTwo="#ffffff60"
              data="marketData"
            />
          </div>
          <div>
            <div className="hidden items-center justify-items-center gap-[5px] text-light-lightTextColor lg:inline-flex">
              <div className="relative h-4 w-4">
                <Image
                  src="/currency/bitcoin.svg"
                  alt="bitcoin symbol"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div>{roundNumber(data.btcMarketCapPercentage)}%</div>
              <ProgressBar
                value={data.btcMarketCapPercentage}
                color="#F7931A"
                data="marketData"
                colorTwo="#ffffff60"
              />
            </div>
          </div>
          <div className="hidden items-center justify-items-center gap-[5px] text-light-lightTextColor lg:inline-flex">
            <div className="relative h-4 w-4">
              <Image
                src="/currency/ethereum.svg"
                alt="ethereum symbol"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div>{roundNumber(data.ethMarketCapPercentage)}%</div>
            <ProgressBar
              value={data.ethMarketCapPercentage}
              color="#849DFF"
              data="marketData"
              colorTwo="#ffffff60"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default MarketDataInfo;
