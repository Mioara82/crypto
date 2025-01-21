import PortfolioIcon from "@/app/icons/portfolioIcon";
import Link from "next/link";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

const PortfolioButton = ({
  isActive,
  handleClick,
}: {
  isActive: boolean;
  handleClick: () => void;
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="flex items-center gap-2" onClick={handleClick}>
      <PortfolioIcon isActive={isActive} />
      {isMobile && !isActive && (
        <div>
        <Link
          href="/Portfolio"
          className="text-xs md:block hover:cursor-fancy m-0 p-0 md:text-base leading-[20.42px]"
        >
          Portfolio
        </Link>
      </div>
      )}
      {!isMobile && (
        <div>
          <Link
            href="/Portfolio"
            className={`${isActive ? " text-light-darkBg dark:text-dark-buttonBorder" : ""} text-xs md:block hover:cursor-fancy m-0 p-0 md:text-base leading-[20.42px]`}
          >
            Portfolio
          </Link>
        </div>
      )}
     
    </div>
  );
};

export default PortfolioButton;
