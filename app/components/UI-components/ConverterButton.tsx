import Link from "next/link";
import { usePathname } from "next/navigation";

const ConverterButton = () => {
  const pathname = usePathname();
  const isActive = pathname === "/Converter";
  return (
    <Link
      href="/Converter"
      passHref
      className={`flex grow basis-0 items-center justify-center rounded-md py-2 text-sm md:text-base transition ${
        isActive
          ? "bg-gradient-to-r from-[#3840E7] to-[#91FCE4] text-light-primary"
          : "bg-transparent text-light-secondaryTextColor dark:text-dark-text"
      }`}
    >
      <button>Converter</button>
    </Link>
  );
};

export default ConverterButton;
