import type React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useGetCoinListWithMarketDataQuery } from "@/lib/api";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import type { RootState } from "@/lib/store";
import type { PortfolioCoin } from "@/lib/features/portfolioSlice";
import { portfolioFormSchema } from "./formSchema";
import type { PortfolioFormData } from "./formSchema";
import Input from "../../UI-components/input";
import Button from "../../UI-components/Button";
import Dropdown from "../../UI-components/Dropdown";
import { getCurrentDate, getDisplayCoin } from "@/app/utils/formatHelpers";
import { findHighlighted } from "@/app/utils/searchFormatter";

const AddAssetModal = ({
  handleModalDisplay,
  mode,
  editingCoin,
}: {
  handleModalDisplay: () => void;
  mode: string;
  editingCoin: PortfolioCoin | null;
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
    currency,
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
    defaultValues: {
      coinName: "",
      purchasedAmount: 0,
      purchasedDate: getCurrentDate(),
    },
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

  const handleCoinSelection = (id: string) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const found = currentData?.find((coin: PortfolioCoin) => coin.id === id);
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
    setShowDropdown(true);
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
  const user = useQuery(api.users.getUser);
  const userId = user?._id || "";

  const onSubmit = async (data: PortfolioFormData) => {
    if (mode === "edit" && editingCoin) {
      await updatePortfolioCoin({
        id: editingCoin.id as Id<"portfolioCoins">,
        coinId: editingCoin?.id,
        name: editingCoin?.name || "",
        symbol: editingCoin?.symbol,
        image: editingCoin.image,
        currentPrice: editingCoin.currentPrice,
        purchaseAmount: editingCoin.purchaseAmount || 0,
        purchasedDate: editingCoin.purchasedDate || "",
      });
    } else {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const selectedCoin = currentData?.find(
        (c: PortfolioCoin) => c.name === data.coinName,
      );
      if (selectedCoin) {
        await addPortfolioCoin({
          userId,
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

  const displayCoin =
    editingCoin && getDisplayCoin(editingCoin.name, filteredList);
  const imageSize = isMobile ? 6 : 8;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute left-1/2 top-1/4 z-40 flex w-[85%] -translate-x-1/2 transform flex-col gap-8 rounded-2xl border border-light-primary bg-light-lilac p-12 blur-none dark:bg-dark-darkBg md:w-1/2 md:-translate-y-1/2 lg:h-96 lg:w-221"
    >
      <div className="relative h-full w-full">
        <div className="mb-4 flex items-center justify-between">
          <span className="hidden text-sm md:block md:text-base">
            Select coins
          </span>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            className="flex cursor-pointer items-center rounded-full border border-light-primary p-2 hover:border-dark-buttonBorder"
            onClick={handleModalDisplay}
          >
            <FiX />
          </div>
        </div>
        <div className="flex h-3/4 flex-col gap-8 lg:flex-row">
          <div className="hidden w-full rounded-lg bg-gradient-to-r from-[#F2F3E2] to-[#B9E0EE] dark:bg-dark-lightBg dark:from-[#43434B] dark:to-[#110744] md:relative md:block lg:w-2/5">
            {displayCoin && (
              <div className="flex flex-row items-center justify-center gap-4 p-3 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:flex-col lg:p-0">
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
                  <h5 className="text-xs opacity-20">Your selected coin</h5>
                  <h4 className="text-sm md:text-base">{displayCoin.name}</h4>
                </div>
              </div>
            )}
          </div>
          <div className="z-0 flex h-full w-full flex-col gap-4">
            <Input
              type="text"
              feature="portfolio"
              value={watchedCoinName}
              {...register("coinName", {
                onChange: handleCoinNameChange,
              })}
              placeholder="Select coin"
              className="w-full rounded p-2 dark:bg-dark-191 dark:text-light-primary/70"
            />
            {errors.coinName && <p>{errors.coinName.message}</p>}
            {showDropdown && isSuccess && (
              <Dropdown ref={listRef} show={showDropdown} feature="portfolio">
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
            <Input
              type="number"
              feature="portfolio"
              value={watchedAmount}
              {...register("purchasedAmount", {
                valueAsNumber: true,
                onChange: handleAmountChange,
              })}
              placeholder="Purchased amount"
              className="w-full rounded p-2 dark:bg-dark-191 dark:text-light-primary/70"
            />
            {errors.purchasedAmount && <p>{errors.purchasedAmount.message}</p>}
            <div>
              <Input
                type="date"
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
                placeholder="Purchased date"
                className="w-full rounded p-2 dark:bg-dark-191 dark:text-light-primary/70"
              />
              {errors.purchasedDate && (
                <p className="mt-2 text-xs text-common-red/80">
                  {errors.purchasedDate.message}
                </p>
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
                text="Save coin"
                onButtonClick={handleSubmit(onSubmit)}
                disabled={!isValid}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddAssetModal;
