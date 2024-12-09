import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import Input from "../../UI-components/input";
import Button from "../../UI-components/Button";
import { useGetCoinListWithMarketDataQuery } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { addCoin } from "@/lib/features/portfolioSlice";

interface FormProps {
  coinName: string;
  purchasedAmount: number;
  purchasedDate: string;
}

const AddAssetModal = ({
  handleModalDisplay,
}: {
  handleModalDisplay: () => void;
}) => {
  const dispatch = useAppDispatch();
  const currency = useAppSelector(
    (state: RootState) => state.currency.currencyName
  );

  const { currentData, isSuccess } = useGetCoinListWithMarketDataQuery({
    currency,
  });
 
  const [formData, setFormData] = useState<FormProps>({
    coinName: "",
    purchasedAmount: 0,
    purchasedDate: "",
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { coinName, purchasedAmount, purchasedDate } = formData;

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
    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        })
      );
      setFormData({
        coinName: "",
        purchasedAmount: 0,
        purchasedDate: "",
      });
      handleModalDisplay();
    } else {
      setMessage("Please select a coin");
    }
  };
  const hasCoins = currentData && currentData.length > 0;
  const filteredList = hasCoins
    ? currentData.filter((coin: any) =>
        coin.name.toLowerCase().includes(searchValue)
      )
    : [];

  return (
    <div className="w-221 h-96 flex flex-col gap-8 z-40 blur-none absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 border border-light-primary p-12 rounded-2xl">
      <div className="flex justify-between">
        <span>Select coins</span>
        <div
          className="border border-light-primary rounded-full p-2 flex items-center cursor-pointer"
          onClick={handleModalDisplay}
        >
          <FiX />
        </div>
      </div>
      <div className="flex h-full ">
        <div className="w-2/5 dark:bg-dark-lightBg flex flex-col gap-8 items-center rounded-lg relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <div>Image</div>
            <div>Name</div>
          </div>
        </div>
        <div className="w-3/5 flex flex-col gap-4">
          <Input
            type="text"
            name="coinName"
            value={coinName}
            onInputChange={handleInputChange}
            placeholder="Select coin"
          />
          {showDropdown && isSuccess && (
            <ul>
              {filteredList.map((coin: any) => (
                <li key={coin.id} onClick={() => handleCoinSelection(coin.id)}>
                  {coin.name}
                </li>
              ))}
            </ul>
          )}
          <Input
            type="number"
            name="purchasedAmount"
            value={purchasedAmount}
            onInputChange={handleInputChange}
            placeholder="Purchased amount"
          />
          <Input
            type="date"
            name="purchasedDate"
            value={purchasedDate}
            onInputChange={handleInputChange}
            placeholder="Purchased date"
          />
          <div className="flex gap-2">
            <Button
              feature="large"
              text="Cancel"
              onButtonClick={handleModalDisplay}
            />
            <Button
              feature="large"
              text="Save and continue"
              onButtonClick={handleSubmit}
            />
          </div>
          {message && <div>{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default AddAssetModal;
