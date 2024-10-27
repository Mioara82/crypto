import React from "react";
import Image from "next/image";
import ProgressBar from "@/app/components/UI-components/progressBar";
import { formatMarketCap, roundNumber } from "@/app/utils/formatHelpers";

interface Data {
  coinData: number;
  exchange: number;
  totalMarketCap: any;
  totalVolumePerCurrency: any;
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
      <nav
        className="flex justify-around m-0 flex-nowrap
         bg-light-darkBg dark:bg-[#191925]
        py-4 rounded-t-md max-w-1440"
      >
        <div className="flex gap-8 text-xs ">
          <div className="inline-flex justify-items-center gap-2">
            <div className="inline-flex justify-items-center gap-1 text-light-lightTextColor">
              <Image
                src="/market/coin.svg"
                alt="flashing symbol of a coin"
                width={14}
                height={14}
              />
              Coins
            </div>
            <div className="text-light-primary">{data.coinData}</div>
          </div>

          <div className="inline-flex justify-items-center gap-2">
            <div className="inline-flex justify-items-center gap-1 text-light-lightTextColor">
              <Image
                src="/market/exchange.svg"
                alt="two squares overlapping"
                width={14}
                height={14}
              />
              Exchange
            </div>
            <div className="text-light-primary">{data.exchange}</div>
          </div>

          <div className="inline-flex justify-items-center gap-1 text-light-lightTextColor">
            <Image
              src="/market/arrow.svg"
              alt="a coloured arrow"
              width={12}
              height={12}
            />
            <div className="text-light-primary">
              {formatMarketCap(data.totalMarketCap[currency])}
            </div>
          </div>
          <div className="inline-flex justify-items-center items-center gap-2">
            <div className="text-light-primary">
              {currencySymbol.startsWith("https://") ? (
                <Image
                  width={20}
                  height={20}
                  src={currencySymbol}
                  alt="icon of the currency"
                  style={{ display: "inline-flex" }}
                />
              ) : (
                currencySymbol
              )}
              <span className="ml-1">
                {formatMarketCap(data.totalVolumePerCurrency[currency])}
              </span>
            </div>
            <ProgressBar value={5} color="#ffffff" colorTwo="#ffffff60" data="marketData"/>
          </div>

          <div className="inline-flex justify-items-center items-center gap-[5px] text-light-lightTextColor">
            <Image
              src="/currency/bitcoin.svg"
              alt="bitcoin symbol"
              width={14}
              height={14}
            />
            <div>{roundNumber(data.btcMarketCapPercentage)}%</div>
            <ProgressBar value={data.btcMarketCapPercentage} color="#F7931A" data="marketData" colorTwo="#ffffff60" />
          </div>

          <div className="inline-flex justify-items-center items-center gap-[5px] text-light-lightTextColor">
            <Image
              src="/currency/ethereum.svg"
              alt="ethereum symbol"
              width={14}
              height={14}
            />
            <div>{roundNumber(data.ethMarketCapPercentage)}%</div>
            <ProgressBar value={data.ethMarketCapPercentage} color="#849DFF" data="marketData" colorTwo="#ffffff60" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default MarketDataInfo;
