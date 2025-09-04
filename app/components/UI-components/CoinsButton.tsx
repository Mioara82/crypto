import Link from "next/link";
import { usePathname } from "next/navigation";

const CoinsButton = () => {
  const pathname = usePathname();
  const isActive = pathname === "/";
  return (
    <Link
      href="/"
      passHref
      className={`flex h-10 grow basis-0 items-center justify-center rounded-2xl transition ${
        isActive
          ? "bg-gradient-to-r from-[#3840E7] to-[#91FCE4] text-light-primary"
          : "bg-transparent text-light-secondaryTextColor dark:text-dark-text"
      }`}
    >
      <button>Coins</button>
    </Link>
  );
};

export default CoinsButton;
