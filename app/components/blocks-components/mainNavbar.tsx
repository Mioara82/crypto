"use client";
import { useIsActive } from "@/lib/hooks/useIsActive";
import ThemeSwitch from "../ThemeSwitch";
import Logo from "../UI-components/logo";
import HomeButton from "../UI-components/homeButton";
import PortfolioButton from "../UI-components/portfolioButton";
import Search from "./search";
import CurrencySelector from "./currencySelector";

const Navbar = () => {
  const [isActive, setIsActive] = useIsActive(0);
  const handleActiveButton = (value: number) => {
    setIsActive((prev) => (prev === value ? null : value));
  };
  return (
    <div className="z-999">
      <div className="w-full px-6 max-w-1296 relative mx-auto flex gap-2 justify-between md:gap-6 md:px-[72px] md:py-4">
        <Logo />
        <div className="flex w-24 gap-2 md:w-[265px] md:gap-6">
          <HomeButton isActive={isActive===0} handleClick={()=>handleActiveButton(0)} />
          <PortfolioButton
            isActive={isActive === 1}
            handleClick={()=>handleActiveButton(1)}
          />
        </div>
        <div className="flex items-center justify-stretch gap-6">
          <Search />
          <CurrencySelector />
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
