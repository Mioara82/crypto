const TableSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 9 }).map((i:any) => (
        <div
          key={i}
          className="flex items-center justify-between p-3  bg-light-primary dark:bg-dark-primaryBg rounded-md"
        >
          <div className="h-10 w-10 bg-gradient-to-r from-skeleton300 via-skeleton200 to-skeleton100 animate-wave rounded-full"></div>
          <div className="h-10 w-32 bg-gradient-to-r from-skeleton300 via-skeleton200 to-skeleton100 animate-wave rounded-md"></div>
          <div className="h-10 w-24 bg-gradient-to-r from-skeleton300 via-skeleton200 to-skeleton100 animate-wave rounded-md"></div>
          <div className="h-10 w-40 bg-gradient-to-r from-skeleton300 via-skeleton200 to-skeleton100 animate-wave rounded-md"></div>
          <div className="h-10 w-40 bg-gradient-to-r from-skeleton300 via-skeleton200 to-skeleton100 animate-wave rounded-md"></div>
          <div className="h-10 w-30 bg-gradient-to-r from-skeleton300 via-skeleton200 to-skeleton100 animate-wave rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
