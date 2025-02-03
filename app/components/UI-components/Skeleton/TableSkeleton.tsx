const TableSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 9 }).map((i: any) => (
        <div
          key={`${i}-${Math.floor(Math.random() * 1000)}`}
          className="flex items-center justify-between rounded-md bg-light-primary p-3 dark:bg-dark-primaryBg"
        >
          <div className="h-10 w-10 animate-wave rounded-full bg-gradient-to-r from-skeleton300 via-skeleton200 to-skeleton100 bg-[length:200%_100%]"></div>
          <div className="h-10 w-32 animate-wave rounded-md bg-gradient-to-r from-skeleton300 via-skeleton200 to-skeleton100 bg-[length:200%_100%]"></div>
          <div className="h-10 w-24 animate-wave rounded-md bg-gradient-to-r from-skeleton300 via-skeleton200 to-skeleton100 bg-[length:200%_100%]"></div>
          <div className="h-10 w-40 animate-wave rounded-md bg-gradient-to-r from-skeleton300 via-skeleton200 to-skeleton100 bg-[length:200%_100%]"></div>
          <div className="h-10 w-40 animate-wave rounded-md bg-gradient-to-r from-skeleton300 via-skeleton200 to-skeleton100 bg-[length:200%_100%]"></div>
          <div className="w-30 h-10 animate-wave rounded-md bg-gradient-to-r from-skeleton300 via-skeleton200 to-skeleton100 bg-[length:200%_100%]"></div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
