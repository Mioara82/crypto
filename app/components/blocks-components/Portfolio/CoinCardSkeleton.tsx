interface CoinSectionSkeletonProps {
  variant?: "market" | "history";
}

const CoinSectionSkeleton: React.FC<CoinSectionSkeletonProps> = ({ variant = "market" }) => {
  const isMarket = variant === "market";
  
  return (
    <div className={`${isMarket ? "relative z-0" : "flex w-full flex-col justify-between gap-4 p-2 md:gap-8"}`}>
      <div className={`flex flex-col gap-4 ${isMarket ? "p-2" : ""}`}>
        {/* Header with title and action button */}
        <div className="flex items-center justify-between">
          <div className={`animate-pulse rounded bg-skeleton100 ${isMarket ? "h-5 w-24 lg:h-6 lg:w-32" : "h-5 w-20 lg:h-6 lg:w-24"}`}></div>
          <div className="h-8 w-8 animate-pulse rounded border border-skeleton100 bg-skeleton100"></div>
        </div>
        
        {/* Data items row */}
        <div className="flex items-center justify-between gap-3">
          {/* First two columns - always visible */}
          <div className="flex flex-col items-center gap-4">
            <div className="h-4 w-20 animate-pulse rounded bg-skeleton100"></div>
            <div className={`${isMarket ? "flex gap-1" : "mt-1"}`}>
              {isMarket ? (
                <>
                  <div className="h-4 w-4 animate-pulse rounded bg-skeleton100"></div>
                  <div className="h-4 w-16 animate-pulse rounded bg-skeleton100"></div>
                </>
              ) : (
                <div className="h-5 w-12 animate-pulse rounded bg-skeleton100"></div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className={`h-4 animate-pulse rounded bg-skeleton100 ${isMarket ? "w-24" : "w-20"}`}></div>
            <div className={`${isMarket ? "flex gap-2" : "mt-1"}`}>
              {isMarket ? (
                <>
                  <div className="h-4 w-4 animate-pulse rounded bg-skeleton100"></div>
                  <div className="h-4 w-12 animate-pulse rounded bg-skeleton100"></div>
                </>
              ) : (
                <div className="h-5 w-16 animate-pulse rounded bg-skeleton100"></div>
              )}
            </div>
          </div>
          
          {/* Third column - responsive visibility */}
          <div className={`flex-col items-center justify-center ${isMarket ? "hidden md:flex" : "hidden sm:flex"} gap-4`}>
            <div className={`h-4 animate-pulse rounded bg-skeleton100 ${isMarket ? "w-32" : "w-16"}`}></div>
            <div className={`${isMarket ? "flex items-center gap-2" : "mt-1 flex items-center gap-2"}`}>
              {isMarket ? (
                <>
                  <div className="h-4 w-8 animate-pulse rounded bg-skeleton100"></div>
                  <div className="h-2 w-20 animate-pulse rounded bg-skeleton100"></div>
                </>
              ) : (
                <>
                  <div className="h-4 w-4 animate-pulse rounded bg-skeleton100"></div>
                  <div className="h-4 w-10 animate-pulse rounded bg-skeleton100"></div>
                </>
              )}
            </div>
          </div>
          
          {/* Fourth column - only for market variant */}
          {isMarket && (
            <div className="hidden flex-col items-center gap-4 lg:flex">
              <div className="h-4 w-36 animate-pulse rounded bg-skeleton100"></div>
              <div className="h-4 w-12 animate-pulse rounded bg-skeleton100"></div>
            </div>
          )}
          
          {/* Fourth column - only for history variant */}
          {!isMarket && (
            <div className="hidden flex-col items-center md:flex">
              <div className="h-4 w-24 animate-pulse rounded bg-skeleton100"></div>
              <div className="mt-1 h-4 w-20 animate-pulse rounded bg-skeleton100"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinSectionSkeleton;