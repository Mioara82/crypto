const QuickSkeleton = () => (
  <div className="flex w-full max-w-324 flex-col gap-4">
    {Array.from({ length: 3 }, (_, index) => (
      <div key={index} className="flex h-auto w-full flex-col rounded-xl bg-gradient-to-r from-[#F2F3E2] to-[#B9E0EE] dark:from-[#43434B] dark:to-[#110744] lg:h-72 lg:flex-row">
        <div className="flex w-full flex-row items-center justify-center gap-4 bg-light-lightBg p-6 dark:bg-dark-darkBg lg:w-1/5 lg:flex-col lg:gap-2">
          <div className="relative h-8 w-8 animate-pulse rounded-md bg-skeleton100"></div>
          <div className="text-center">
            <div className="h-5 w-20 animate-pulse rounded bg-skeleton100 lg:h-6 lg:w-24"></div>
            <div className="mt-1 h-4 w-12 animate-pulse rounded bg-skeleton100"></div>
          </div>
        </div>
        <div className="flex w-full flex-col justify-center gap-4 p-6 lg:w-4/5">
          <div className="relative z-0">
            <div className="flex flex-col gap-4 p-2">
              <div className="flex items-center justify-between">
                <div className="h-5 w-24 animate-pulse rounded bg-skeleton100 lg:h-6 lg:w-32"></div>
                <div className="h-8 w-8 animate-pulse rounded border border-skeleton100 bg-skeleton100"></div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-4 w-20 animate-pulse rounded bg-skeleton100"></div>
                  <div className="flex gap-1">
                    <div className="h-4 w-4 animate-pulse rounded bg-skeleton100"></div>
                    <div className="h-4 w-16 animate-pulse rounded bg-skeleton100"></div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="h-4 w-24 animate-pulse rounded bg-skeleton100"></div>
                  <div className="flex gap-2">
                    <div className="h-4 w-4 animate-pulse rounded bg-skeleton100"></div>
                    <div className="h-4 w-12 animate-pulse rounded bg-skeleton100"></div>
                  </div>
                </div>
                <div className="hidden flex-col justify-center gap-4 md:flex">
                  <div className="h-4 w-32 animate-pulse rounded bg-skeleton100"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-8 animate-pulse rounded bg-skeleton100"></div>
                    <div className="h-2 w-20 animate-pulse rounded bg-skeleton100"></div>
                  </div>
                </div>
                <div className="hidden flex-col items-center gap-4 lg:flex">
                  <div className="h-4 w-36 animate-pulse rounded bg-skeleton100"></div>
                  <div className="h-4 w-12 animate-pulse rounded bg-skeleton100"></div>
                </div>
              </div>
            </div>
          </div>
          <hr className="bg-light-primary/80"></hr>
          <div className="flex w-full flex-col justify-between gap-4 p-2 md:gap-8">
            <div className="flex items-center justify-between">
              <div className="h-5 w-20 animate-pulse rounded bg-skeleton100 lg:h-6 lg:w-24"></div>
              <div className="h-8 w-8 animate-pulse rounded border border-skeleton100 bg-skeleton100"></div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col items-center">
                <div className="h-4 w-20 animate-pulse rounded bg-skeleton100"></div>
                <div className="mt-1 h-5 w-12 animate-pulse rounded bg-skeleton100"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-4 w-20 animate-pulse rounded bg-skeleton100"></div>
                <div className="mt-1 h-5 w-16 animate-pulse rounded bg-skeleton100"></div>
              </div>
              <div className="hidden flex-col items-center justify-center sm:flex">
                <div className="h-4 w-16 animate-pulse rounded bg-skeleton100"></div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-4 w-4 animate-pulse rounded bg-skeleton100"></div>
                  <div className="h-4 w-10 animate-pulse rounded bg-skeleton100"></div>
                </div>
              </div>
              <div className="hidden flex-col items-center md:flex">
                <div className="h-4 w-24 animate-pulse rounded bg-skeleton100"></div>
                <div className="mt-1 h-4 w-20 animate-pulse rounded bg-skeleton100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const PortfolioLoading = () => {
  return (
    <div className="relative">
      <main className="relative flex min-h-screen flex-col p-4 sm:p-8 md:p-24">
        <div className="mb-6 h-4 w-32 animate-pulse rounded bg-skeleton100 lg:h-5 lg:w-36"></div>
        <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
          <div className="m-auto flex items-center justify-around gap-3">
            <div className="h-10 w-24 animate-pulse rounded bg-skeleton100 lg:h-12 lg:w-28"></div>
          </div>
        </div>
        <div className="flex justify-center">
          <QuickSkeleton />
        </div>
      </main>
    </div>
  );
};

export default PortfolioLoading;
