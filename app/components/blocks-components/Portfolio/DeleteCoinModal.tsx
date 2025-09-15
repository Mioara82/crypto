import ReactDOM from "react-dom";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const DeleteCoinModal = ({
  handleDeleteModalDisplay,
  coinId,
  name,
  coinImage,
  closeModal,
}: {
  handleDeleteModalDisplay: any;
  coinId: Id<"portfolioCoins">;
  name: string;
  coinImage: string;
  closeModal: () => void;
}) => {
  const removeCoinMutation = useMutation(
    api.portfolioCoins.deletePortfolioCoin,
  );
  const removeCoin = async () => {
    await removeCoinMutation({ id: coinId });
    handleDeleteModalDisplay(null);
    closeModal();
  };
  return ReactDOM.createPortal(
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />
      <div className="fixed left-1/2 top-1/2 z-[51] flex h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform flex-col gap-4 rounded-2xl border-[1px] border-dark-darkBg/20 bg-gradient-to-r from-[#F2F3E2] to-[#B9E0EE] p-12 shadow-2xl dark:border-light-primary/30 dark:bg-gradient-to-r dark:from-[#43434B] dark:to-[#110744]">
        <div className="self-center">
        <div className="relative h-12 w-12">
          <Image
            src={coinImage}
            alt="coin icon"
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <p className="m-0">
        By pressing Delete you will permanently delete this
        <span className="ml-2 mr-2 text-center text-base text-common-green">
          {name}
        </span>
        from your portfolio
      </p>
      <div className="flex gap-5 self-center">
        <button
          className="rounded-md border-[1px] border-dark-buttonBorder p-2 hover:border-common-red dark:border-light-primary/20 dark:hover:border-common-red"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="rounded-md border-[1px] border-common-red p-2 text-common-red hover:border-none hover:bg-common-red/70 dark:border-light-primary/20"
          onClick={removeCoin}
        >
          Delete
        </button>
      </div>
    </div>
    </>,
    document.body,
  );
};

export default DeleteCoinModal;
