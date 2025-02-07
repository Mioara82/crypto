import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { useGetCoinListWithMarketDataQuery } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useClickOutside } from "@/lib/hooks/useClickOutside";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { RootState } from "@/lib/store";
import { addCoin, updateCoin } from "@/lib/features/portfolioSlice";
import { PortfolioCoin } from "@/lib/features/portfolioSlice";
import Input from "../../UI-components/input";
import Button from "../../UI-components/Button";
import Dropdown from "../../UI-components/Dropdown";
import { getCurrentDate, getDisplayCoin } from "@/app/utils/formatHelpers";
import { findHighlighted } from "@/app/utils/searchFormatter";

interface FormProps {
  coinName: string | "";
  purchasedAmount: number | 0;
  purchasedDate: string | "";
}

const AddAssetModal = ({
  handleModalDisplay,
  mode,
  editingCoinId,
}: {
  handleModalDisplay: () => void;
  mode: string;
  editingCoinId: string | null;
}) => {
  const listRef = useRef(null);
  const isMobile = useIsMobile();

  const dispatch = useAppDispatch();
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName,
  );
  const currencySymbol = useAppSelector(
    (state: RootState) => state.currency.symbol,
  );
  const coins = useAppSelector(
    (state: RootState) => state.portfolioSlice.portfolioCoins,
  );

  const { currentData, isSuccess } = useGetCoinListWithMarketDataQuery({
    currency,
  });

  const editedCoin = coins
    ? coins.find((coin: PortfolioCoin) => coin.id === editingCoinId)
    : null;

  const [formData, setFormData] = useState<FormProps>({
    coinName: "",
    purchasedAmount: 0,
    purchasedDate: "",
  });

  useEffect(() => {
    if (mode === "edit" && editingCoinId) {
      if (editedCoin) {
        setFormData({
          coinName: editedCoin.name,
          purchasedAmount: editedCoin.purchaseAmount || 0,
          purchasedDate: editedCoin.purchasedDate || "",
        });
      }
    }
  }, [mode, editedCoin, editingCoinId, coins]);

  const [searchValue, setSearchValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const { coinName, purchasedAmount, purchasedDate } = formData;
  const debouncedValue = useDebounce(searchValue, 1000);

  const closeDropdown = () => {
    setShowDropdown(false);
    setSearchValue("");
  };

  useClickOutside(listRef, closeDropdown);

  const handleCoinSelection = (id: string) => {
    const found = currentData?.find((coin: any) => coin.id === id);
    if (found) {
      setFormData((prev: any) => ({ ...prev, coinName: found.name }));
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "coinName") {
      setSearchValue(value.trim().toLowerCase());
      setShowDropdown(true);
    }
    if (name === "purchasedDate") {
      if (value > getCurrentDate()) {
        setErrorMessage("The purchase date must be in the past");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
        return;
      }
    }
    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    if (coinName !== "" && purchasedAmount !== 0 && purchasedDate !== "") {
      setIsButtonDisabled(false);
    }
  }, [coinName, purchasedAmount, purchasedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    if (mode === "edit" && editingCoinId) {
      dispatch(
        updateCoin({
          id: editingCoinId,
          image: editedCoin?.image || "",
          symbol: editedCoin?.symbol || "",
          currentPrice: editedCoin?.currentPrice || 0,
          name: coinName,
          purchaseAmount: purchasedAmount,
          purchasedDate: purchasedDate,
        }),
      );
    } else {
      const selectedCoin = currentData?.find((c: any) => c.name === coinName);
      if (selectedCoin) {
        dispatch(
          addCoin({
            id: selectedCoin.id || "",
            image: selectedCoin.image || "",
            name: selectedCoin.name || "",
            symbol: selectedCoin.symbol || "",
            currentPrice: selectedCoin.currentPrice || 0,
            purchaseAmount: purchasedAmount || 0,
            purchasedDate: purchasedDate || "",
          }),
        );
      }
    }
    setFormData({
      coinName: "",
      purchasedAmount: 0,
      purchasedDate: "",
    });
    setSearchValue("");
    handleModalDisplay();
  };
  const hasCoins = currentData && currentData.length > 0;
  const filteredList = hasCoins
    ? currentData.filter((coin: any) =>
        coin.name.toLowerCase().includes(debouncedValue),
      )
    : [];

  const displayCoin = getDisplayCoin(coinName, filteredList);
  const imageSize = isMobile ? 6 : 8;

  return (
    <form className="absolute left-1/2 top-1/4 z-40 flex w-[85%] md:w-1/2 -translate-x-1/2  md:-translate-y-1/2 transform flex-col gap-8 rounded-2xl border border-light-primary bg-light-lilac p-12 blur-none dark:bg-dark-darkBg lg:h-96 lg:w-221">
      <div className="relative h-full w-full">
        <div className="mb-4 flex items-center justify-between">
          <span className="hidden text-sm md:block md:text-base">
            Select coins
          </span>
          <div
            className="flex cursor-pointer items-center rounded-full border border-light-primary p-2 hover:border-dark-buttonBorder"
            onClick={handleModalDisplay}
          >
            <FiX />
          </div>
        </div>
        <div className="flex h-3/4 flex-col gap-8 lg:flex-row">
          <div className="hidden md:block md:relative w-full rounded-lg dark:bg-dark-lightBg bg-gradient-to-r from-[#F2F3E2] to-[#B9E0EE] dark:from-[#43434B] dark:to-[#110744] lg:w-2/5">
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
              name="coinName"
              feature="portfolio"
              value={coinName}
              onInputChange={handleInputChange}
              placeholder="Select coin"
              className="w-full rounded p-2 dark:bg-dark-191 dark:text-light-primary/70"
            />
            {showDropdown && isSuccess && (
              <Dropdown ref={listRef} show={showDropdown} feature="portfolio">
                {filteredList.map((coin: any) => (
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
              name="purchasedAmount"
              feature="portfolio"
              value={purchasedAmount}
              onInputChange={handleInputChange}
              placeholder="Purchased amount"
              className="w-full rounded p-2 dark:bg-dark-191 dark:text-light-primary/70"
            />
            <div>
              <Input
                type="date"
                name="purchasedDate"
                feature="portfolio"
                value={purchasedDate}
                onInputChange={handleInputChange}
                placeholder="Purchased date"
                className="w-full rounded p-2 dark:bg-dark-191 dark:text-light-primary/70"
              />
              {errorMessage && errorMessage.length > 0 && (
                <p className="mt-2 text-xs text-common-red/80">
                  {errorMessage}
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
                onButtonClick={handleSubmit}
                disabled={isButtonDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddAssetModal;
