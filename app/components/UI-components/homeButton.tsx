import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@/app/icons/homeIcon";

const HomeButton = () => {
   const pathname = usePathname();
  const isActive = pathname === "/";
  return (
    <div className="flex items-center gap-2">
      <HomeIcon isActive={isActive} />
      <Link
        href="/"
        className={`${isActive ? "text-light-darkBg dark:text-dark-buttonBorder" : ""} hover:cursor-fancy m-0 p-0 text-xs leading-[20.42px] md:block md:text-base`}
      >
        Home
      </Link>
    </div>
  );
};

export default HomeButton;
