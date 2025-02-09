import PortfolioIcon from "@/app/icons/portfolioIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

const PortfolioButton = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const isActive = pathname === "/Portfolio";
  return (
    <div className="flex items-center gap-2">
      {isMobile ? (
        <Link href="/Portfolio" className="hover:cursor-pointer">
          <PortfolioIcon isActive={isActive} />
        </Link>
      ) : (
        <PortfolioIcon isActive={isActive} />
      )}

      {isMobile ? (
        !isActive ? (
          <div>
            <Link
              href="/Portfolio"
              className="hover:cursor-fancy m-0 hidden p-0 text-xs leading-[20.42px] sm:block sm:text-sm md:text-base"
            >
              Portfolio
            </Link>
          </div>
        ) : null
      ) : (
        <div>
          <Link
            href="/Portfolio"
            className={`${isActive ? "text-light-darkBg dark:text-dark-buttonBorder" : ""} hover:cursor-fancy m-0 p-0 text-xs leading-[20.42px] md:block md:text-base`}
          >
            Portfolio
          </Link>
        </div>
      )}
    </div>
  );
};

export default PortfolioButton;
