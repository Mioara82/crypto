import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import HomeIcon from "@/app/icons/homeIcon";

const HomeButton = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const isActive = pathname === "/";
  return (
    <div className="flex w-[110px] items-center gap-2">
      {isMobile ? (
        <Link href="/">
          <HomeIcon isActive={isActive} />
        </Link>
      ) : (
        <HomeIcon isActive={isActive} />
      )}

      {isMobile ? (
        !isActive ? (
          <div>
            <Link
              href="/"
              className="shover:cursor-fancy m-0 p-0 text-xs leading-[20.42px] xs:block sm:text-sm md:text-base"
            >
              Home
            </Link>
          </div>
        ) : null
      ) : (
        <div>
          <Link
            href="/"
            className={`${isActive ? "text-light-darkBg dark:text-dark-buttonBorder" : ""} hover:cursor-fancy m-0 p-0 text-base leading-[20.42px] md:block`}
          >
            Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeButton;
