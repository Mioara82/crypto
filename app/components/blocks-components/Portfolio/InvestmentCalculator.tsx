import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { IoBarChartOutline } from "react-icons/io5";
import { useGetCoinListWithMarketDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { useIsShown } from "@/lib/hooks/useIsShown";
import { RootState } from "@/lib/store";
import { FormProps } from "@/lib/types/types";
import Input from "../../UI-components/input";
import Button from "../../UI-components/Button";
import CalculatorCoinList from "./CalculatorCoinList";
import LineChart from "./Chart";
import Dropdown from "../../UI-components/Dropdown";
import InfoCards from "./InfoCards";
import Spinner from "../../UI-components/Spinner";
import {
  capitaliseString,
  formatString,
  calculateTotalInvestmentPerGrowth,
  calculateTotalInvestmentPerInvestmentAdded,
  convertDateToTimestamp,
  generatePurchaseDates,
  calculateCoinsWithGrowthRate,
  calculateCoinsWithRegularInvestments,
} from "@/app/utils/formatHelpers";
import { infoCardsDescription } from "@/app/utils/infoCardsDescription";

interface FormOutputData {
  historicPrices: number[];
  historicDates: Date[];
  totalAmount: number;
  coinsValue: number | undefined;
}

const InvestmentCalculator = ({
  handleCalculatorDisplay,
}: {
  handleCalculatorDisplay: () => void;
}) => {
  const chartRef = useRef(null);
  const listRef = useRef(null);
  const isMobile = useIsMobile();
  const chartIcon = isMobile ? 20 : 25;
  const placeholderValue = isMobile ? "Min 1" : "Minimum 1";

  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName,
  );
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol,
  );
  const {
    currentData,
    isSuccess,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useGetCoinListWithMarketDataQuery({
    currency,
  });
  const [show, handleIsShown] = useIsShown();
  const [formFeature, setFormFeature] = useState<string>("valueCost");
  const [formOutputData, setFormOutputData] = useState<FormOutputData>({
    historicPrices: [],
    historicDates: [],
    totalAmount: 0,
    coinsValue: 0,
  });

  const { historicPrices, historicDates, totalAmount, coinsValue } =
    formOutputData;
  const [formData, setFormData] = useState<FormProps>({
    coinName: "",
    startDate: "",
    endDate: "",
    interval: 0,
    initialInvestment: 0,
  });

  const isInitialLoad = useRef(true);
  useEffect(() => {
    if (isInitialLoad.current) isInitialLoad.current = false;
  }, []);

  const [searchValue, setSearchValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [error, setError] = useState<{
    dateError: string | null;
    apiError: string | null;
  }>({
    dateError: "",
    apiError: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const isActive =
    formFeature === "valueCost" ? 0 : formFeature === "dollarCost" ? 1 : null;

  const handleFormFeature = (
    value: string,
    field: "growRate" | "intervalInvestment",
  ) => {
    setFormOutputData((prev: FormOutputData) => ({
      ...prev,
      totalAmount: 0,
      coinsValue: 0,
    }));
    setFormFeature((prevFeature: string) => {
      if (value === "value") {
        return "valueCost";
      } else {
        if (value === "dollar") {
          return "dollarCost";
        }
      }
      return prevFeature;
    });

    setFormData((prev) => ({
      ...prev,
      [field]: 0,
    }));
  };

  const {
    coinName,
    startDate,
    endDate,
    interval,
    initialInvestment,
    growRate,
    intervalInvestment,
  } = formData;

  const debouncedValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    const isGrowRateValid = growRate !== undefined && growRate !== 0;
    const isIntervalInvestmentValid =
      intervalInvestment !== undefined && intervalInvestment !== 0;
    if (
      formFeature === "valueCost" &&
      coinName !== "" &&
      startDate !== "" &&
      endDate !== "" &&
      interval !== 0 &&
      initialInvestment !== 0 &&
      isGrowRateValid
    ) {
      setIsButtonDisabled(false);
    } else if (
      formFeature === "dollarCost" &&
      coinName !== "" &&
      startDate !== "" &&
      endDate !== "" &&
      interval !== 0 &&
      initialInvestment !== 0 &&
      isIntervalInvestmentValid
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [
    coinName,
    startDate,
    endDate,
    interval,
    initialInvestment,
    growRate,
    intervalInvestment,
  ]);

  const handleCoinSelection = (id: string) => {
    const found = currentData?.find((coin: any) => coin.id === id);
    if (found) {
      setFormData((prev: any) => ({ ...prev, coinName: found.name }));
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const currentDate = new Date();

    if (name === "coinName") {
      setSearchValue(value.trim().toLowerCase());
      setShowDropdown(true);
    }
    if (name === "startDate") {
      const start = new Date(value);
      if (start > currentDate) {
        setError((prev: any) => ({
          ...prev,
          dateError: "The initial investment date must be in the past",
        }));

        setTimeout(() => {
          setError((prev: any) => ({
            ...prev,
            dateError: "",
          }));
        }, 2000);
        return;
      }
    }
    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  const closeDropdown = () => {
    setShowDropdown(false);
    setSearchValue("");
  };
  useClickOutside(listRef, closeDropdown);
  useClickOutside(chartRef, handleIsShown);

  const hasCoins = currentData && currentData.length > 0;

  const filteredList = hasCoins
    ? currentData.filter((coin: any) =>
        coin.name.toLowerCase().includes(debouncedValue),
      )
    : [];

  //this function displays in UI the coin the user selects from the search dropdown
  const getDisplayCoin = (value: string, filteredList: any) => {
    if (!filteredList || filteredList.length === 0) {
      return { name: "Bitcoin" };
    }
    if (value === "") {
      return filteredList.find(
        (coin: any) => coin.name.toLowerCase() === "bitcoin",
      );
    } else {
      return filteredList.find(
        (coin: any) => coin.name.toLowerCase() === value.toLowerCase(),
      );
    }
  };

  const displayCoin =
    filteredList && filteredList.length > 0
      ? getDisplayCoin(coinName, filteredList)
      : getDisplayCoin("Bitcoin", currentData);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    const id = displayCoin && displayCoin.id;
    const currentPrice = displayCoin && displayCoin.currentPrice;

    const getHistoricPrices = async ({
      id,
      currency,
      startDate,
      endDate,
    }: {
      id: string;
      currency: string;
      startDate: string;
      endDate: string;
    }) => {
      const apiKey: string = process.env.COINGECKO_API_KEY || "";
      const start = convertDateToTimestamp(startDate);
      const end = convertDateToTimestamp(endDate);
      const query = `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=${currency}&from=${start}&to=${end}&${apiKey}`;
      setLoading(true);
      try {
        setError((prev: any) => ({
          ...prev,
          apiError: null,
        }));
        const response = await fetch(query);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        const historicPrices = data.prices;
        return historicPrices;
      } catch (error) {
        setError((prev: any) => ({
          ...prev,
          apiError: "Error retriving coin data",
        }));
      } finally {
        setLoading(false);
      }
    };

    const data = await getHistoricPrices({ id, currency, startDate, endDate });

    if (!data) return;

    const convertedTimeStampsInData = data.map((entry: number[]) => ({
      timeStamp: entry[0],
      price: entry[1],
    }));

    const purchaseTimestamps =
      generatePurchaseDates(startDate, endDate, interval) || [];

    const pricesForPurchaseDates = purchaseTimestamps
      .map((purchaseTimestamp) => {
        if (!convertedTimeStampsInData) return;
        const closestEntry = convertedTimeStampsInData.reduce(
          (closest: any, current: any) => {
            const closestDifference = Math.abs(
              closest.timeStamp - purchaseTimestamp,
            );
            const currentDifference = Math.abs(
              current.timeStamp - purchaseTimestamp,
            );

            return currentDifference < closestDifference ? current : closest;
          },
        );

        return closestEntry ? Math.floor(closestEntry.price) : null;
      })
      .filter((price): price is number => price !== null);

    const getTotalCoinsValue = () => {
      if (formFeature === "valueCost" && growRate !== undefined) {
        return calculateCoinsWithGrowthRate(
          pricesForPurchaseDates,
          initialInvestment,
          growRate ?? 1,
          currentPrice,
        );
      } else if (
        formFeature === "dollarCost" &&
        intervalInvestment !== undefined
      ) {
        return calculateCoinsWithRegularInvestments(
          pricesForPurchaseDates,
          initialInvestment,
          intervalInvestment ?? 0,
          currentPrice,
        );
      }
    };

    const coinsValue = getTotalCoinsValue();
    const totalInvestments = getTotalInvestments();
    const historicDatesArray = Array.isArray(purchaseTimestamps)
      ? purchaseTimestamps.map((timestamp: number) => new Date(timestamp))
      : [];

    setFormOutputData({
      historicDates: historicDatesArray,
      historicPrices: pricesForPurchaseDates,
      totalAmount: totalInvestments,
      coinsValue: coinsValue,
    });
  };

  const getTotalInvestments = useCallback(() => {
    if (formFeature === "valueCost" && growRate !== undefined) {
      return calculateTotalInvestmentPerGrowth(
        initialInvestment,
        growRate,
        interval,
        startDate,
        endDate,
      );
    }
    if (formFeature === "dollarCost" && intervalInvestment !== undefined) {
      return calculateTotalInvestmentPerInvestmentAdded(
        initialInvestment,
        intervalInvestment,
        interval,
        startDate,
        endDate,
      );
    }
    return 0;
  }, [formFeature, growRate, initialInvestment, interval, intervalInvestment]);

  const hasGrowFeature = formFeature === "valueCost";
  const hasIntervalInvestmentFeature = formFeature === "dollarCost";

  return (
    <div>
      <div
        className={`absolute top-1/2 w-full transform md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 ${show ? "z-0 blur-sm" : "blur-none"}`}
      >
        <form onSubmit={handleSubmit}>
          <div className="absolute left-1/2 top-1/2 z-10 flex w-[80%] -translate-x-1/2 -translate-y-1/2 transform flex-col gap-8 rounded-2xl border border-light-primary bg-light-lilac p-3 blur-none dark:bg-dark-darkBg md:p-6 lg:w-221 lg:p-12">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-light-secondaryTextColor dark:text-dark-text md:text-base lg:text-2xl">
                Investment calculator
              </p>
              <div
                className="cursor-pointer rounded border-[1px] border-skeleton100 p-2 hover:border-common-portfolioButton dark:border-0 dark:bg-common-linearGradient dark:hover:border-[1px] dark:hover:border-common-brigthBlue"
                onClick={handleCalculatorDisplay}
              >
                <FiX className="h-4 w-4" />
              </div>
            </div>
            <div className="relative flex w-full justify-between gap-2 lg:gap-8">
              <div className="hidden h-11 w-48 items-center gap-2 rounded-lg bg-light-lilac pb-2 pl-2 pr-6 pt-2 text-base font-bold text-light-secondaryTextColor dark:bg-dark-lightBg dark:text-dark-text md:flex">
                {isSearchLoading && <Spinner />}
                {isSearchError && (
                  <p className="absolute -bottom-6 left-0 mt-2 text-xs text-common-red/80">
                    Error loading coin data
                  </p>
                )}
                {displayCoin ? (
                  <div className="flex items-center justify-center gap-2 p-3">
                    <div className="relative h-6 w-6">
                      <Image
                        src={displayCoin.image}
                        alt="coin image"
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <p className="text-nowrap">
                      {formatString(displayCoin.name)}
                    </p>
                    <p>({capitaliseString(displayCoin.symbol)})</p>
                  </div>
                ) : (
                  <Spinner />
                )}
              </div>
              <Input
                type="text"
                name="coinName"
                value={coinName}
                feature="investment"
                onInputChange={handleInputChange}
                onBlur={closeDropdown}
                placeholder="Select coin"
                className="w-full rounded p-2 dark:bg-dark-191 dark:text-light-primary/70"
              />
              {showDropdown && isSuccess && (
                <Dropdown
                  ref={listRef}
                  show={showDropdown}
                  feature="investment"
                >
                  <CalculatorCoinList
                    error={isSearchError}
                    loading={isSearchLoading}
                    list={filteredList}
                    handleCoinSelection={handleCoinSelection}
                    currencySymbol={currencySymbol}
                    searchValue={searchValue}
                  />
                </Dropdown>
              )}
            </div>
            <div className="flex items-center justify-between md:max-w-full">
              <div
                className="flex cursor-pointer justify-start rounded-md bg-light-lilac pl-2 text-light-secondaryTextColor hover:scale-125 dark:bg-dark-darkBg dark:text-common-azure"
                onClick={handleIsShown}
              >
                <IoBarChartOutline size={chartIcon} />
              </div>
              <div className="flex max-w-full gap-2">
                <Button
                  text={`${isMobile ? "VCA" : "Value Cost Averaging"}`}
                  feature="xl"
                  isActive={isActive === 0}
                  onButtonClick={() => handleFormFeature("value", "growRate")}
                />
                <Button
                  text={`${isMobile ? "DCA" : "Dollar Cost Averaging"}`}
                  feature="xl"
                  isActive={isActive === 1}
                  onButtonClick={() =>
                    handleFormFeature("dollar", "intervalInvestment")
                  }
                />
              </div>
            </div>
            <div className="relative flex flex-col items-center gap-4 md:flex-row">
              <div className="flex flex-col gap-2">
                <p className="text-sm md:text-base">
                  Enter investment start date
                </p>
                <div className="relative">
                  <div className="absolute left-2 top-3">
                    <InfoCards
                      value="startDate"
                      text={infoCardsDescription.startDate.description}
                    />
                  </div>
                  <Input
                    type="date"
                    value={startDate}
                    feature="investment"
                    name="startDate"
                    onInputChange={handleInputChange}
                    className="h-10 w-60 rounded-md border-[1px] border-dotted border-common-cyan bg-light-primary pl-7 text-sm text-common-azure dark:bg-[#232336] md:text-base"
                  />
                </div>
              </div>
              {error.dateError && error.dateError.length > 0 && (
                <p className="absolute -bottom-6 left-0 mt-2 text-xs text-common-red/80">
                  {error.dateError}
                </p>
              )}
              <div className="relative flex items-center gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm md:text-base">
                    Enter investment end date
                  </p>
                  <div className="relative">
                    <div className="absolute left-2 top-3">
                      <InfoCards
                        value="endDate"
                        text={infoCardsDescription.endDate.description}
                      />
                    </div>
                    <Input
                      type="date"
                      value={endDate}
                      feature="investment"
                      name="endDate"
                      onInputChange={handleInputChange}
                      className="h-10 w-60 rounded-md border-[1px] border-dotted border-common-cyan bg-light-primary pl-7 text-sm text-common-azure dark:bg-[#232336] md:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-light-lightBg p-4 dark:bg-dark-darkBg">
              <div className="relative flex items-center justify-between gap-3 border-b-[1px] border-b-light-primaryBg/10 p-4">
                <div className="mr-auto flex items-center gap-2">
                  <InfoCards
                    value="interval"
                    text={infoCardsDescription.interval.description}
                  />
                  <p className="text-sm md:text-base">
                    Contribution interval, days
                  </p>
                </div>
                <Input
                  type="number"
                  onInputChange={handleInputChange}
                  name="interval"
                  feature="investment"
                  value={interval}
                  className="ml-auto h-10 w-16 rounded-md border-[1px] border-dotted border-common-cyan bg-light-primary opacity-55 dark:bg-[#232336] md:w-44"
                  placeholder={placeholderValue}
                />
              </div>
              <div className="relative flex items-center gap-3 border-b-[1px] border-b-light-primaryBg/10 p-4">
                <div className="mr-auto flex items-center gap-2">
                  <InfoCards
                    value="initialInvestment"
                    text={infoCardsDescription.initialInvestment.description}
                  />
                  <p className="text-sm md:text-base">
                    Initial investment, {currencySymbol}
                  </p>
                </div>
                <Input
                  type="number"
                  onInputChange={handleInputChange}
                  name="initialInvestment"
                  feature="investment"
                  value={initialInvestment}
                  className="ml-auto h-10 w-16 rounded-md border-[1px] border-dotted border-common-cyan bg-light-primary dark:bg-[#232336] md:w-44"
                  placeholder={placeholderValue}
                />
              </div>
              {(isInitialLoad.current || hasGrowFeature) && (
                <div className="relative flex items-center justify-between gap-3 border-b-[1px] border-b-light-primaryBg/10 p-4">
                  <div className="mr-auto flex items-center gap-2">
                    <InfoCards
                      value="growRate"
                      text={infoCardsDescription.growRate.description}
                    />
                    <p className="text-sm md:text-base">
                      Grow rate per interval, %
                    </p>
                  </div>
                  <Input
                    type="number"
                    onInputChange={handleInputChange}
                    name="growRate"
                    feature="investment"
                    value={growRate || ""}
                    className="ml-auto h-10 w-16 rounded-md border-[1px] border-dotted border-common-cyan bg-light-primary dark:bg-[#232336] md:w-44"
                    placeholder={placeholderValue}
                  />
                </div>
              )}
              {hasIntervalInvestmentFeature && (
                <div className="relative flex items-center justify-between gap-3 border-b-[1px] border-b-light-primaryBg/10 p-4">
                  <div className="mr-auto flex items-center gap-2">
                    <InfoCards
                      value="intervalInvestment"
                      text={infoCardsDescription.intervalInvestment.description}
                    />
                    <p className="text-sm md:text-base">
                      Investment added each interval
                    </p>
                  </div>
                  <Input
                    type="number"
                    onInputChange={handleInputChange}
                    name="intervalInvestment"
                    feature="investment"
                    value={intervalInvestment || ""}
                    className="ml-auto h-10 w-16 rounded-md border-[1px] border-dotted border-common-cyan md:w-44"
                    placeholder={placeholderValue}
                  />
                </div>
              )}

              <div className="relative flex items-center gap-3 border-b-[1px] border-b-light-primaryBg/10 p-4">
                <p>Total amount, {currencySymbol}</p>
                <InfoCards
                  value="totalAmount"
                  text={infoCardsDescription.totalAmount.description}
                />
                {loading && <Spinner />}
                {error.apiError && (
                  <p className="absolute -bottom-6 left-0 mt-2 text-xs text-common-red/80">
                    {error.apiError}
                  </p>
                )}
                <p className="ml-auto">
                  <span className="mr-1">{currencySymbol}</span>
                  {totalAmount}
                </p>
              </div>
              <div className="relative flex items-center gap-3 pl-4 pr-4 pt-4">
                <p>Coins value, {currencySymbol}</p>
                <InfoCards
                  value="coinsValue"
                  text={infoCardsDescription.coinsValue.description}
                />
                {loading && <Spinner />}
                {error.apiError && (
                  <p className="absolute -bottom-6 left-0 mt-2 text-xs text-common-red/80">
                    {error.apiError}
                  </p>
                )}
                <p className="ml-auto">
                  <span className="mr-1">{currencySymbol}</span>
                  {coinsValue}
                </p>
              </div>
            </div>
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`h-11 w-full self-center rounded-md border-[1px] border-solid px-4 py-3 text-center drop-shadow-md ${
                isButtonDisabled
                  ? "cursor-not-allowed border-none bg-light-primary text-light-secondaryTextColor hover:bg-light-primary dark:bg-skeleton200 dark:text-dark-text hover:dark:bg-skeleton200"
                  : "shadow-indigo-500/50 cursor-pointer bg-light-secondaryTextColor hover:bg-light-primary dark:bg-common-linearGradient hover:dark:bg-common-azure"
              }`}
            >{`Calculate ${formFeature === "valueCost" ? "VCA" : "DCA"}`}</button>
          </div>
        </form>
      </div>
      {show && (
        <div
          ref={chartRef}
          className="absolute left-1/2 top-1/2 z-40 w-221 -translate-x-1/2 -translate-y-1/2 transform flex-col gap-8 rounded-2xl p-4 blur-none"
        >
          <LineChart
            historicDates={historicDates}
            historicPrices={historicPrices}
            coin={displayCoin}
            currencySymbol={currencySymbol}
          />
        </div>
      )}
    </div>
  );
};

export default InvestmentCalculator;
