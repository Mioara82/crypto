import type React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Doc } from "@/convex/_generated/dataModel";
import { FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useGetCoinListWithMarketDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import type { RootState } from "@/lib/store";
import { portfolioFormSchema } from "./formSchema";
import type { PortfolioFormData } from "./formSchema";
import { PortfolioCoin } from "@/lib/features/portfolioSlice";
import Input from "../../UI-components/input";
import Button from "../../UI-components/Button";
import Dropdown from "../../UI-components/Dropdown";
import { findHighlighted } from "@/app/utils/searchFormatter";

type PortfolioCoinFromConvex = Doc<"portfolioCoins">;

const AddAssetModal = ({
  handleModalDisplay,
  mode,
  editingCoin,
}: {
  handleModalDisplay: () => void;
  mode: string;
  editingCoin: PortfolioCoinFromConvex | null;
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const listRef = useRef(null);
  const isMobile = useIsMobile();

  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName,
  );
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol,
  );

  const { currentData, isSuccess } = useGetCoinListWithMarketDataQuery({
    endpoint: "SearchData",
    query: { currency },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioFormSchema as any),
    mode: "onChange",
  });

  const watchedCoinName = watch("coinName");
  const watchedAmount = watch("purchasedAmount");
  const watchedDate = watch("purchasedDate");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (mode === "edit" && editingCoin) {
      reset({
        coinName: editingCoin.name,
        purchasedAmount: editingCoin.purchaseAmount || 0,
        purchasedDate: editingCoin.purchasedDate || "",
      });
    }
  }, [mode, editingCoin]);

  const closeDropdown = () => {
    setShowDropdown(false);
    setSearchValue("");
  };

  useClickOutside(listRef, closeDropdown);

  const handleCoinSelection = (coinId: string) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const found = currentData?.find((coin: any) => coin.id === coinId);
    if (found) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      setValue("coinName", found.name, { shouldValidate: true });
      setSearchValue(found.name);
      setShowDropdown(false);
    }
  };

  const handleCoinNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value.trim().toLowerCase());
    setValue("coinName", value, { shouldValidate: true });
    if (value.trim().length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("purchasedDate", value, { shouldValidate: true });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setValue("purchasedAmount", value, { shouldValidate: true });
  };

  const addPortfolioCoin = useMutation(api.portfolioCoins.addPortfolioCoin);
  const updatePortfolioCoin = useMutation(
    api.portfolioCoins.updatePortfolioCoin,
  );

  const onSubmit = async (data: PortfolioFormData) => {
    if (mode === "edit" && editingCoin?._id) {
      await updatePortfolioCoin({
        id: editingCoin._id as Id<"portfolioCoins">,
        name: data.coinName,
        purchaseAmount: data.purchasedAmount,
        purchasedDate: data.purchasedDate,
      });
    } else {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const selectedCoin = currentData?.find(
        (coin: PortfolioCoin) => coin.name === data.coinName,
      );
      if (selectedCoin) {
        await addPortfolioCoin({
          coinId: selectedCoin?.id,
          image: selectedCoin.image || "",
          name: selectedCoin.name || "",
          symbol: selectedCoin.symbol || "",
          currentPrice: selectedCoin.currentPrice || 0,
          purchaseAmount: data.purchasedAmount || 0,
          purchasedDate: data.purchasedDate || "",
        });
      }
    }
    reset();
    setSearchValue("");
    handleModalDisplay();
  };

  const debouncedValue = useDebounce(searchValue, 1000);
  const hasCoins = currentData && currentData.length > 0;
  const filteredList = hasCoins
    ? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      currentData.filter((coin: PortfolioCoin) =>
        coin.name.toLowerCase().includes(debouncedValue),
      )
    : [];
  const selectedCoin = currentData?.find(
    (coin: PortfolioCoin) => coin.name === watchedCoinName,
  );

  let displayCoin: PortfolioCoin | undefined;

  if (mode === "edit" && editingCoin?.coinId) {
    displayCoin = currentData?.find(
      (coin: PortfolioCoin) => coin.id === editingCoin.coinId,
    );
  } else if (selectedCoin) {
    displayCoin = selectedCoin;
  } else {
    displayCoin = currentData?.find(
      (coin: PortfolioCoin) => coin.name === "Bitcoin",
    );
  }

  const imageSize = isMobile ? 6 : 8;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute left-1/2 top-1 z-40 flex w-3/4 -translate-x-1/2 transform flex-col gap-8 rounded-2xl border border-light-primary bg-light-lilac p-12 blur-none dark:bg-dark-darkBg md:top-1/2 md:w-1/2 md:-translate-y-1/2"
    >
      <div className="relative h-full w-full">
        <div className="mb-4 flex items-center justify-center">
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <h2>Add transaction</h2>
          <button
            type="button"
            aria-label="Close modal"
            className="ml-auto flex cursor-pointer items-center rounded-full border border-light-primary p-2 hover:border-dark-buttonBorder"
            onClick={handleModalDisplay}
          >
            <FiX />
          </button>
        </div>
        <div className="flex h-3/4 flex-col gap-8 lg:flex-row">
          <aside
            aria-labelledby="selectedCoin"
            className="hidden w-full rounded-lg bg-gradient-to-r from-[#F2F3E2] to-[#B9E0EE] dark:bg-dark-lightBg dark:from-[#43434B] dark:to-[#110744] md:relative md:block lg:w-2/5"
          >
            {displayCoin && (
              <div
                className="flex flex-row items-center justify-center gap-4 p-3 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:flex-col lg:p-0"
                id="selectedCoin"
              >
                <div className={`relative h-${imageSize} w-${imageSize}`}>
                  <Image
                    src={displayCoin.image}
                    alt="coin image"
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  {/* <h5 className="text-xs opacity-20">Your selected coin</h5> */}
                  <h4 className="text-center text-sm md:text-base">
                    {displayCoin.name}
                  </h4>
                </div>
              </div>
            )}
          </aside>
          <fieldset>
            <legend className="sr-only">Add transaction</legend>
            <div className="z-0 flex h-full w-3/4 flex-col justify-center gap-2 md:w-1/2 lg:w-full lg:gap-4">
              <div>
                <label htmlFor="coinName" className="text-xs font-light">
                  Select a coin
                </label>
                <Input
                  type="text"
                  id="coinName"
                  feature="portfolio"
                  aria-invalid={errors.coinName ? "true" : "false"}
                  aria-describedby="coinNameHelp"
                  value={watchedCoinName}
                  {...register("coinName", {
                    onChange: handleCoinNameChange,
                  })}
                  className="w-full rounded p-2 dark:bg-dark-191 dark:text-light-primary/70"
                />

                {errors.coinName && (
                  <span
                    id="coinNameHelp"
                    className="text-xs text-common-red/80"
                  >
                    {errors.coinName.message}
                  </span>
                )}
                {showDropdown && isSuccess && (
                  <Dropdown
                    ref={listRef}
                    show={showDropdown}
                    feature="portfolio"
                  >
                    {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                    {filteredList.map((coin: any) => (
                      // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                      <li
                        className="mb-2 flex items-center gap-2"
                        key={coin.id}
                        onClick={() => handleCoinSelection(coin.id)}
                      >
                        <div className="relative h-6 w-6">
                          <Image
                            src={coin.image}
                            alt="coin image"
                            fill
                            style={{ objectFit: "contain" }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <p className="text-sm">
                          {findHighlighted(coin.name, searchValue)}
                        </p>
                        <p className="text-xs opacity-40">
                          <span className="mr-1">{currencySymbol}</span>
                          {coin.currentPrice.toFixed(3)}
                        </p>
                      </li>
                    ))}
                  </Dropdown>
                )}
              </div>
              <div>
                <label htmlFor="purchasedAmount" className="text-xs font-light">
                  Purchased amount
                </label>
                <Input
                  type="number"
                  id="purchasedAmount"
                  aria-invalid={errors.purchasedAmount ? "true" : "false"}
                  aria-describedby="purchasedAmountHelp"
                  feature="portfolio"
                  value={watchedAmount}
                  {...register("purchasedAmount", {
                    valueAsNumber: true,
                    onChange: handleAmountChange,
                  })}
                  className="w-full rounded p-2 dark:bg-dark-191 dark:text-light-primary/70"
                />
                {errors.purchasedAmount && (
                  <span
                    id="purchasedAmountHelp"
                    className="text-xs text-common-red/80"
                  >
                    {errors.purchasedAmount.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="purchasedDate" className="text-xs font-light">
                  Purchased date
                </label>
                <Input
                  type="date"
                  id="purchasedDate"
                  aria-invalid={errors.purchasedDate ? "true" : "false"}
                  aria-describedby="purchasedDateHelp"
                  feature="portfolio"
                  value={watchedDate}
                  {...register("purchasedDate", {
                    onChange: handleDateChange,
                    validate: (value) => {
                      const date = new Date(value);
                      const today = new Date();
                      if (date > today) {
                        return "Purchased date cannot be in the future.";
                      }
                      return true;
                    },
                  })}
                  className="w-full rounded p-2 dark:bg-dark-191 dark:text-light-primary/70"
                />
                {errors.purchasedDate && (
                  <span
                    id="purchasedDateHelp"
                    className="mt-2 text-xs text-common-red/80"
                  >
                    {errors.purchasedDate.message}
                  </span>
                )}
              </div>
              <div className="z-50 flex gap-2">
                <Button
                  feature="large"
                  text="Cancel"
                  onButtonClick={handleModalDisplay}
                />
                <Button
                  feature="large"
                  text={mode === "edit" ? "Update asset" : "Add asset"}
                  onButtonClick={handleSubmit(onSubmit)}
                  disabled={!isValid}
                />
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </form>
  );
};

export default AddAssetModal;
