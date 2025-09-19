import CoinSectionSkeleton from "./CoinCardSkeleton";

const AssetCoinsSkeleton = () => {
  const skeletonCards = Array.from({ length: 3 }, (_, index) => (
    <div key={index} className="flex h-auto w-full flex-col rounded-xl bg-gradient-to-r from-[#F2F3E2] to-[#B9E0EE] dark:from-[#43434B] dark:to-[#110744] lg:h-72 lg:flex-row">
      <div className="flex w-full flex-row items-center justify-center gap-4 bg-light-lightBg p-6 dark:bg-dark-darkBg lg:w-1/5 lg:flex-col lg:gap-2">
        <div className="relative h-8 w-8 animate-pulse rounded-md bg-skeleton100"></div>
        <div className="text-center">
          <div className="h-5 w-20 animate-pulse rounded bg-skeleton100 lg:h-6 lg:w-24"></div>
          <div className="mt-1 h-4 w-12 animate-pulse rounded bg-skeleton100"></div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-center gap-4 p-6 lg:w-4/5">
        <CoinSectionSkeleton variant="market" />
        <hr className="bg-light-primary/80"></hr>
        <CoinSectionSkeleton variant="history" />
      </div>
    </div>
  ));

  return (
    <div className="flex w-full max-w-324 flex-col gap-4">
      {skeletonCards}
    </div>
  );
};

export default AssetCoinsSkeleton;