import Link from "next/link";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import HomeIcon from "@/app/icons/homeIcon";

const HomeButton = ({
  isActive,
  handleClick,
}: {
  isActive: boolean;
  handleClick: () => void;
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="flex w-[110px] items-center gap-2" onClick={handleClick}>
      <HomeIcon isActive={isActive} />
      {isMobile && !isActive && (
        <div>
        <Link
          href="/"
          className="text-xs md:block hover:cursor-fancy m-0 p-0 md:text-base leading-[20.42px]"
        >
          Home
        </Link>
      </div>
      )}
      {!isMobile && (
        <div>
          <Link
            href="/"
            className={`${isActive ? " text-light-darkBg dark:text-dark-buttonBorder" : ""} md:block hover:cursor-fancy m-0 p-0 text-base leading-[20.42px]`}
          >
            Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeButton;
